// 数据操作模块
var db = require('../models/milinbook.server.model')
var formidable = require('formidable'); //上传功能的插件
var fs = require('fs');
var async = require('async');
var urlPase = require('url');
var moment = require('moment')

// 用户工具类
var userUtils = require('../utils/user')
// 管理员工具类
var adminUtils = require('../utils/admin')

module.exports = {
  // 测试数据
  getAll: function(req, res, next){
    var  sql = 'SELECT * FROM test';
    db.query(sql,function (err,result) {
        if (err) {
            return res.status(200).json({
                data:null,
                code:0,
                message:"server data err"
            });
        } else {
            res.status(200).json({
                data:result,
                code:0,
                message:"data ok"
            });
        }
    })
  },

  /* 
    客户前台 start
  */

  // 前台登陆
  shopLogin (req, res, next) {
    async.waterfall([
      callback => {
        let sql = `SELECT * FROM tb_customerinfo WHERE CustomerEmail = '${req.body.username}'`
        db.query(sql, (err, result) => {
          if (result.length === 0) {
            callback(new Error('账号不存在'))
          } else {
            callback(err, result[0])
          }
        })
      },
      (userItem, callback) => {
        // 密码正确的话 更新登录次数 和 登录时间
        if (userItem.CustomerPwd === req.body.password) {
          callback(null, userItem)
        } else {
          callback(new Error('密码错误, 请重新输入'))
        }
      },
      (userItem, callback) => {
        let sql = `UPDATE tb_customerinfo SET CustomerLastLogTime = '${moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')}' WHERE CustomerId = ${userItem.CustomerId}`
        db.query(sql, (err, result) => {
          if (result.affectedRows === 1) {
            callback(err, userItem)
          } else {
            callback(new Error('更新登录时间失败，登陆失败'))
          }
        })
      },
      (userItem, callback) => {
        let sql = `UPDATE tb_customerinfo SET CustomerLogCount = CustomerLogCount + 1 WHERE CustomerId = ${userItem.CustomerId}`
        db.query(sql, (err, result) => {
          if (result.affectedRows === 1) {
            callback(err, userItem)
          } else {
            callback(new Error('更新登录次数失败，登陆失败'))
          }
        })
      },
      (userItem, callback) => {
        let sql = `SELECT * FROM tb_customerinfo WHERE CustomerId = ${userItem.CustomerId}`
        db.query(sql, (err, result) => {
          callback(err, result[0])
        })
      },
    ], (err, result) => {
      if (err) {
        res.status(200).json({
          data: null,
          code: -1,
          message: err.message
        })
      } else {
        res.status(200).json({
          data: {
            me: result
          },
          code:0,
          message: "登陆成功"
        })
      }
    })
  },

  // 用户注册
  shopSignIn (req, res, next) {
    console.log('req.body注册', req.body)
    async.series([
      callback => {
        let query_name_sql = `SELECT * FROM tb_customerinfo WHERE CustomerName = '${req.body.customerName}'`
        db.query(query_name_sql, (err, result) => {
          if (result[0]) {
            return res.status(200).json({
                data: null,
                code: 1,
                message:"昵称重复, 注册失败"
            }); 
          } else {
            callback(err)
          }
        })
      },
      callback => {
        let query_account_sql = `SELECT * FROM tb_customerinfo WHERE CustomerEmail = '${req.body.customerEmail}'`
        db.query(query_account_sql, (err, result) => {
          if (result[0]) {
            return res.status(200).json({
                data: null,
                code: 1,
                message:"邮箱重复, 注册失败"
            }); 
          } else {
            callback(err)
          }
        })
      },
      callback => {
        let query_tel_sql = `SELECT * FROM tb_customerinfo WHERE CustomerTel = '${req.body.customerTel}'`
        db.query(query_tel_sql, (err, result) => {
          if (result[0]) {
            return res.status(200).json({
                data: null,
                code: 1,
                message:"手机号重复, 注册失败"
            }); 
          } else {
            callback(err)
          }
        })
      },
      callback => {
        let sql = `INSERT INTO tb_customerinfo
                  (
                    CustomerName,
                    CustomerEmail,
                    CustomerTrueName,
                    CustomerSex,
                    CustomerTel,
                    CustomerAddr,
                    CustomerPwd,
                    CustomerAvatar,
                    CustomerRegTime,
                    CustomerLogCount
                  )
                  VALUES
                  (
                    '${req.body.customerName}',
                    '${req.body.customerEmail}',
                    '${req.body.customerTrueName}',
                    '${req.body.customerSex}',
                    '${req.body.customerTel}',
                    '${req.body.customerAddr}',
                    '${req.body.customerPwd}',
                    '${req.body.customerAvatar}',
                    '${adminUtils.getNowFormatDate()}',
                    ${0}
                  )`
        db.query(sql, (err, result) => {
          console.log('err注册',err)
          console.log('result注册', result, sql)
          // 查看受影响的行数 如果等于 1 
          if (result.affectedRows === 1) {
            callback(err)
          } else {
            res.status(200).json({
              data: null,
              code: 1,
              message: "注册账号失败"
            })
          }
        })
      }
    ], (err, result) => {
      if (err) {
        res.status(200).json({
          data: err,
          code: 1,
          message: "注册账号失败"
        })
      } else {
        res.status(200).json({
          // 返回新插入的Id
          data: {
            insertId: result.insertId
          },
          code: 0,
          message: "注册账号成功"
        })
      }
    })
  },

  // 获取图书列表
  shopGetBookList (req, res, next) {
    async.waterfall([
      callback => {
        let sql = ''
        console.log('获取书籍req', req.query.bookTypeId)
        if (!Number(req.query.bookTypeId)) {
          sql = `SELECT count(*) AS total FROM tb_bookinfo WHERE BookName LIKE '%${req.query.searchText}%' AND BookStatus = '1'`
        } else {
          sql = `SELECT count(*) AS total FROM tb_bookinfo WHERE BookName LIKE '%${req.query.searchText}%' AND BookTypeId = ${req.query.bookTypeId} AND BookStatus = '1'`
        }
        console.log('获取书籍SQL', sql)
        db.query(sql, (err, result) => {
          callback(err, result[0].total)
        })
      },
      (total, callback) => {
        if (total <= 0) {
          callback(null, {
            result: [],
            total: 0
          })
          return
        }
        let sql = ''
        let pageNum = req.query.pageNum
        if (pageNum > total) {
          pageNum = total
        }
        let skip = (pageNum - 1) * req.query.pageSize
        if (!Number(req.query.bookTypeId)) {
          sql = `SELECT * FROM tb_bookinfo WHERE BookName LIKE '%${req.query.searchText}%' AND BookStatus = '1' order by BookId DESC LIMIT ${skip}, ${req.query.pageSize}`
        } else {
          sql = `SELECT * FROM tb_bookinfo WHERE BookName LIKE '%${req.query.searchText}%' AND BookTypeId = ${req.query.bookTypeId} AND BookStatus = '1' order by BookId DESC LIMIT ${skip}, ${req.query.pageSize}`
        }
        db.query(sql, (err, result) => {
          callback(err, {
            result: result,
            total: total
          })
        })
      }
    ], function(err, results) {
      if (err) {
        res.status(200).json({
          data:err,
          code:-1,
          message: "获取图书列表失败"
        });
      } else {
        res.status(200).json({
          data: {
            bookList: results.result,
            total: results.total
          },
          code: 0,
          message: "获取图书列表成功"
        })
      }
    })
  },

  // 添加书籍到购物车
  shopAddShopCar (req, res, next) {
    // 判断用户是否登陆
    userUtils.isUserLogin(req, res)
    let sql = `INSERT INTO tb_shopbook
              (
                CustomerId,
                BookId,
                ordermount,
                goodsStatus,
                address
              )
              VALUE
              (
                ${req.body.CustomerId},
                ${req.body.BookId},
                ${req.body.ordermount},
                '${req.body.goodsStatus}',
                '${req.body.address}'
              )`
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(200).json({
          data:err,
          code:-1,
          message: "添加到购物车失败"
        });
      }
      if (result.affectedRows === 1) {
        return res.status(200).json({
          data: null,
          code: 0,
          message: "添加到购物车成功"
        });
      } else {
        return res.status(200).json({
          data:null,
          code:1,
          message: "添加到购物车失败"
        });
      }
    });
  },

  // 获取当前账户的购物车中的数量
  shopGetShopCarCount (req, res, next) {
    // 判断用户是否登陆
    userUtils.isUserLogin(req, res)
    // 当前us噢登录用户的id
    console.log(JSON.parse(req.cookies.user_me).CustomerId)
    let userId = JSON.parse(req.cookies.user_me).CustomerId
    let sql = `SELECT COUNT(*) AS shopCarCount FROM tb_shopbook where CustomerId = ${userId}`
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(200).json({
          data:err,
          code:-1,
          message: "获取到购物车数量失败"
        });
      }
      if (result.length === 1) {
        return res.status(200).json({
          data: {
            shopCarCount: result[0].shopCarCount
          },
          code: 0,
          message: "获取到购物车数量成功"
        });
      } else {
        return res.status(200).json({
          data:null,
          code:1,
          message: "获取到购物车数量失败"
        });
      }
    });
  },

  /* 
    客户前台 end
  */

  // ========================================================================================

  /* 
    后台管理  start
  */

  // 后台管理员登录
  adminLogin (req, res, next) {
    let sql = `SELECT * FROM tb_manager where AdminAccount = "${req.body.AdminAccount}"`
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(200).json({
                data:null,
                code:-1,
                message:"登陆失败"
            });
        } else {
            // 查询不到此账号 返回值为空
            if (result.length === 0) {
                return res.status(200).json({
                    data:null,
                    code:1,
                    message:"账号不存在"
                });
            } else {
                if (result[0].AdminPwd === req.body.AdminPwd) {
                    return res.status(200).json({
                        data: {
                            me: result[0]
                        },
                        code:0,
                        message:"登陆成功"
                    }); 
                } else {
                    return res.status(200).json({
                        data:null,
                        code:2,
                        message:"密码错误"
                    }); 
                }
            }
        }
    })
  },

  // ==========管理员列表管理================

  // 获取所有管理员账号
  adminGetAccountAll (req, res, next) {
    adminUtils.isRoot(req, res)
    let currentAdminId = JSON.parse(req.cookies.admin_me).AdminId
    let sql = `SELECT * FROM tb_manager WHERE AdminId != ${currentAdminId}`
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(200).json({
          data:err,
          code:-1,
          message:"获取账号列表失败"
        });
      } else {
        return res.status(200).json({
          data: {
            accountList: result
          },
          code: 0,
          message: "获取账号列表成功"
        });
      }
    });
  },

  // 添加管理员账号
  adminAddAdminAccount (req, res, next) {
    adminUtils.isRoot(req, res)
    async.series([
      callback => {
        let query_name_sql = `SELECT * FROM tb_manager WHERE AdminName = '${req.body.AdminName}'`
        db.query(query_name_sql, (err, result) => {
          if (result[0]) {
            return res.status(200).json({
                data: null,
                code: 1,
                message:"账号昵称重复, 添加失败"
            }); 
          } else {
            callback(err)
          }
        })
      },
      callback => {
        let query_name_sql = `SELECT * FROM tb_manager WHERE AdminAccount = '${req.body.AdminAccount}'`
        db.query(query_name_sql, (err, result) => {
          if (result[0]) {
            return res.status(200).json({
                data: null,
                code: 1,
                message:"账号重复, 添加失败"
            }); 
          } else {
            callback(err)
          }
        })
      },
      callback => {
        let sql = `INSERT INTO tb_manager 
              (AdminName, AdminAccount, AdminPwd, AdminFlag, AdminAvatar)
              VALUES
              ('${req.body.AdminName}', '${req.body.AdminAccount}', '${req.body.AdminPwd}', '${req.body.AdminFlag}', '${req.body.AdminAvatar}')`
        db.query(sql, (err, result) => {
          // 查看受影响的行数 如果等于 1 
          if (result.affectedRows === 1) {
            res.status(200).json({
              // 返回新插入的Id
              data: {
                insertId: result.insertId
              },
              code: 0,
              message: "添加管理员账号成功"
            })
            callback(err)
          } else {
            res.status(200).json({
              data: null,
              code: 0,
              message: "添加管理员账号失败"
            })
            callback(err)
          }
        })
      }
    ], (err, result) => {
      if (err) {
        res.status(200).json({
          data: err,
          code: -1,
          message: "添加管理员账号失败"
        })
      }
    })
  },

  // 删除管理员账号
  adminDeleteAdminAccount (req, res, next) {
    adminUtils.isRoot(req, res)
    let sql = `DELETE FROM tb_manager WHERE AdminId = ${Number(req.query.adminId)}`
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(200).json({
          data:err,
          code:-1,
          message:"删除管理员账号失败"
        });
      }
      if (result.affectedRows === 1) {
        return res.status(200).json({
          data: null,
          code: 0,
          message: "删除管理员账号成功"
        });
      } else {
        return res.status(200).json({
          data:null,
          code:1,
          message:"删除管理员账号失败"
        });
      }
    });
  },

  // 更新账号的状态
  adminUpdateAdminAccountStatus (req, res, next) {
    adminUtils.isRoot(req, res)
    let sql = `UPDATE tb_manager SET AdminStatus = '${req.body.AdminStatus}' WHERE AdminId = ${req.body.AdminId}`
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(200).json({
          data:err,
          code:-1,
          message: "更新账号状态失败"
        });
      }
      if (result.affectedRows === 1) {
        return res.status(200).json({
          data: null,
          code: 0,
          message: "更新账号状态成功"
        });
      } else {
        return res.status(200).json({
          data:null,
          code:1,
          message: "更新账号状态失败"
        });
      }
    });
  },

  // 更新当前账号信息
  adminUpdateAdminAccount (req, res, next) {
    adminUtils.isRoot(req, res)
    async.waterfall([
      callback => {
        let sql = `UPDATE tb_manager SET AdminName = '${req.body.AdminName}', AdminFlag = '${req.body.AdminFlag}', AdminAvatar = '${req.body.AdminAvatar}' WHERE AdminId = ${req.body.AdminId}`
        db.query(sql, (err, result) => {
          if (result.affectedRows === 1) {
            // 生成的ID会传给下一个任务
            callback(err, req.body.AdminId); 
          } else {
            return res.status(200).json({
              data:null,
              code:1,
              message: "更新账号信息失败"
            })
          }
        })
      },
      (insertId, callback) => {
        console.log('insertId', insertId)
        let sql = `SELECT * FROM tb_manager where AdminId = "${insertId}"`
        db.query(sql, (err, result) => {
          callback(err, result)
        })
      }
    ], function(err, results) {
      if (err) {
        db.rollback(); // 发生错误事务回滚
        return res.status(200).json({
          data:err,
          code:-1,
          message: "更新账号信息失败"
        });
      } else {
        return res.status(200).json({
          data: {
            newAccountInfo: results[0]
          },
          code: 0,
          message: "更新账号信息成功"
        })
      }
    })
  },

  // 更新当前账号密码
  adminUpdateAdminPwd (req, res, next) {
    // 获取当前登陆的管理员id
    let adminId = adminUtils.getAdminId(req, res)
    console.log('body', req.body, 'id', adminId)
    async.series([
      callback => {
        let sql = `SELECT * FROM tb_manager WHERE AdminId = ${adminId} AND AdminPwd = '${req.body.oldPwd}'`
        db.query(sql, (err, result) => {
          console.log('result', result)
          if (result[0]) {
            callback(err)
          } else {
            return res.status(200).json({
              data: null,
              code: 1,
              message:"旧密码不对，请重新输入"
            })
          }
        })
      },
      callback => {
        let sql = `UPDATE tb_manager SET AdminPwd = '${req.body.confirmPwd}' WHERE AdminId = ${adminId}`
        db.query(sql, (err, result) => {
          // 更新成功
          if (result.affectedRows === 1) {
            callback(err); 
          } else {
            return res.status(200).json({
              data:null,
              code:1,
              message: "修改密码失败"
            })
          }
        })
      }
    ], (err, result) => {
      if (err) {
        res.status(200).json({
          data: null,
          code: -1,
          message: "添加管理员账号失败"
        })
      } else {
        return res.status(200).json({
          data:null,
          code:0,
          message: "修改密码成功"
        })
      }
    })
  },

  // ==========用户列表管理===========

  // 获取用户列表 分页 传入like 和 页码 及 每页数量 , 先like 统计总条数 然后再分页查
  adminGetUserAccountList (req, res, next) {
    async.waterfall([
      callback => {
        let sql = `SELECT count(*) AS total FROM tb_customerinfo WHERE CustomerName LIKE '%${req.query.searchText}%'`
        db.query(sql, (err, result) => {
          callback(err, result[0].total)
        })
      },
      (total, callback) => {
        if (total <= 0) {
          callback(null, {
            result: [],
            total: 0
          })
          return
        }
        let pageNum = req.query.pageNum
        if (pageNum > total) {
          pageNum = total
        }
        let skip = (pageNum - 1) * req.query.pageSize
        let sql = `SELECT * FROM tb_customerinfo WHERE CustomerName LIKE '%${req.query.searchText}%' LIMIT ${Number(skip)}, ${Number(req.query.pageSize)}`
        db.query(sql, (err, result) => {
          callback(err, {
            result: result,
            total: total
          })
        })
      }
    ], function(err, results) {
      if (err) {
        res.status(200).json({
          data:err,
          code:-1,
          message: "获取用户账号列表失败"
        });
      } else {
        res.status(200).json({
          data: {
            userList: results.result,
            total: results.total
          },
          code: 0,
          message: "获取用户账号列表成功"
        })
      }
    })
  },

  // 禁用或启用用户账号
  adminChangeUserAccountStatus (req, res, next) {
    adminUtils.isRoot(req, res)
    let sql = `UPDATE tb_customerinfo SET CustomerStatus = '${req.body.newStatus}' WHERE CustomerId = ${req.body.userId}`
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(200).json({
          data:err,
          code:-1,
          message: "更新用户账号状态失败"
        });
      }
      if (result.affectedRows === 1) {
        return res.status(200).json({
          data: null,
          code: 0,
          message: "更新用户账号状态成功"
        });
      } else {
        return res.status(200).json({
          data:null,
          code:1,
          message: "更新用户账号状态失败"
        });
      }
    });
  },
  
  // 删除用户账号
  adminDeleteUserAccount (req, res, next) {
    adminUtils.isRoot(req, res)
    let sql = `DELETE FROM tb_customerinfo WHERE CustomerId = ${req.query.userId}`
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(200).json({
          data:err,
          code:-1,
          message:"删除用户账号失败"
        });
      }
      if (result.affectedRows === 1) {
        return res.status(200).json({
          data: null,
          code: 0,
          message: "删除用户账号成功"
        });
      } else {
        return res.status(200).json({
          data:null,
          code:1,
          message:"删除用户账号失败"
        });
      }
    });
  },


  // ==========书籍管理===========

  // 获取书籍类型
  adminGetBookTypeList (req, res, next) {
    let sql = `SELECT BookTypeId AS value, BookTypeName AS label FROM tb_booktypeinfo`
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(200).json({
          data:err,
          code:-1,
          message:"获取书籍类型列表失败"
        });
      } else {
        return res.status(200).json({
          data: {
            bookTypeList: result
          },
          code: 0,
          message: "获取书籍类型列表成功"
        });
      }
    });
  },

  // 获取书籍列表 传入 搜索条件 书的类型 页码 每页的条目数
  adminGetBookList (req, res, next) {
    adminUtils.isBooksAdmin(req, res)
    async.waterfall([
      callback => {
        let sql = ''
        console.log('获取书籍req', req.query.bookTypeId)
        if (!Number(req.query.bookTypeId)) {
          sql = `SELECT count(*) AS total FROM tb_bookinfo WHERE BookName LIKE '%${req.query.searchText}%'`
        } else {
          sql = `SELECT count(*) AS total FROM tb_bookinfo WHERE BookName LIKE '%${req.query.searchText}%' AND BookTypeId = ${req.query.bookTypeId}`
        }
        console.log('获取书籍SQL', sql)
        db.query(sql, (err, result) => {
          callback(err, result[0].total)
        })
      },
      (total, callback) => {
        if (total <= 0) {
          callback(null, {
            result: [],
            total: 0
          })
          return
        }
        let sql = ''
        let pageNum = req.query.pageNum
        if (pageNum > total) {
          pageNum = total
        }
        let skip = (pageNum - 1) * req.query.pageSize
        if (!Number(req.query.bookTypeId)) {
          sql = `SELECT * FROM tb_bookinfo WHERE BookName LIKE '%${req.query.searchText}%' order by BookId DESC LIMIT ${skip}, ${req.query.pageSize}`
        } else {
          sql = `SELECT * FROM tb_bookinfo WHERE BookName LIKE '%${req.query.searchText}%' AND BookTypeId = ${req.query.bookTypeId} order by BookId DESC LIMIT ${skip}, ${req.query.pageSize}`
        }
        db.query(sql, (err, result) => {
          callback(err, {
            result: result,
            total: total
          })
        })
      }
    ], function(err, results) {
      if (err) {
        res.status(200).json({
          data:err,
          code:-1,
          message: "获取图书列表失败"
        });
      } else {
        res.status(200).json({
          data: {
            bookList: results.result,
            total: results.total
          },
          code: 0,
          message: "获取图书列表成功"
        })
      }
    })
  },

  // 添加书籍
  adminAddBookInfo (req, res, next) {
    adminUtils.isBooksAdmin(req, res)
    async.series([
      callback => {
        let query_isbn_sql = `SELECT * FROM tb_bookinfo WHERE Bookisbn = '${req.body.Bookisbn}'`
        db.query(query_isbn_sql, (err, result) => {
          if (result[0]) {
            console.log('添加书籍', result[0])
            callback(new Error('ISBN重复'))
          } else {
            callback(err)
          }
        })
      },
      callback => {
        let sql = `INSERT INTO tb_bookinfo
                  (
                    BookTypeId,
                    BookName,
                    BookPress,
                    BookPubDate,
                    BookSize,
                    BookAuthor,
                    BookTanslor,
                    Bookisbn,
                    BookPrice,
                    BookOutline,
                    BookMprice,
                    BookDealmount,
                    BookDiscount,
                    BookPic,
                    BookStoremount,
                    BookPackstyle
                  )
                  VALUES
                  (
                     ${req.body.BookTypeId},
                    '${req.body.BookName}',
                    '${req.body.BookPress}',
                    '${moment(req.body.BookPubDate).format('YYYY-MM-DD HH:mm:ss')}',
                     ${req.body.BookSize},
                    '${req.body.BookAuthor}',
                    '${req.body.BookTanslor}',
                    '${req.body.Bookisbn}',
                     ${Number(req.body.BookPrice)},
                    '${req.body.BookOutline}',
                     ${Number(req.body.BookMprice)},
                     0,
                     ${Number(req.body.BookDiscount)},
                    '${req.body.BookPic}',
                     ${req.body.BookStoremount},
                    '${req.body.BookPackstyle}'
                  )`
        db.query(sql, (err, result) => {
          console.log('添加书籍', sql)
          console.log('添加书籍res', result)
          // 查看受影响的行数 如果等于 1 
          if (result.affectedRows === 1) {
            callback(err, result)
          } else {
            callback(new Error('添加书籍信息失败，MySQL影响行数为0'))
          }
        })
      }
    ], (err, result) => {
      if (err) {
        res.status(200).json({
          data: err,
          code: -1,
          message: err.message
        })
      } else {
        res.status(200).json({
          // 返回新插入的Id
          data: {
            insertId: result.insertId
          },
          code: 0,
          message: "添加书籍信息成功"
        })
      }
    })
  },

  // 编辑书籍
  adminUpdateBookInfo (req, res, next) {
    adminUtils.isBooksAdmin(req, res)
    let sql = `UPDATE tb_bookinfo SET
                BookTypeId = ${req.body.BookTypeId},
                BookName = '${req.body.BookName}',
                BookPress = '${req.body.BookPress}',
                BookPubDate = '${moment(req.body.BookPubDate).format('YYYY-MM-DD HH:mm:ss')}',
                BookSize = ${req.body.BookSize},
                BookAuthor = '${req.body.BookAuthor}',
                BookTanslor = '${req.body.BookTanslor}',
                Bookisbn = '${req.body.Bookisbn}',
                BookPrice = ${Number(req.body.BookPrice)},
                BookOutline = '${req.body.BookOutline}',
                BookMprice = ${Number(req.body.BookMprice)},
                BookDealmount = 0,
                BookDiscount = ${Number(req.body.BookDiscount)},
                BookPic = '${req.body.BookPic}',
                BookStoremount = ${req.body.BookStoremount},
                BookPackstyle = '${req.body.BookPackstyle}'
                WHERE BookId = ${req.body.BookId}
              `
    db.query(sql, (err, result) => {
      console.log('编辑书籍xinxi', sql)
      console.log('编辑书籍result', result.affectedRows)
      if (err) {
        res.status(200).json({
          data: err,
          code: -1,
          message: '编辑书籍信息失败'
        })
      } else if (result.affectedRows === 1) {
        res.status(200).json({
          data: null,
          code: 0,
          message: "编辑书籍信息成功"
        })
      } else {
        res.status(200).json({
          data: err,
          code: 1,
          message: '编辑书籍信息失败'
        })
      }
    })
  },

  // 改变书籍状态 上架或者下架
  adminUpdateBookStatus (req, res, next) {
    adminUtils.isBooksAdmin(req, res)
    let sql = `UPDATE tb_bookinfo SET BookStatus = '${req.body.BookStatus}' WHERE BookId = ${req.body.BookId}`
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(200).json({
          data:err,
          code:-1,
          message: "改变书籍状态失败"
        });
      }
      if (result.affectedRows === 1) {
        return res.status(200).json({
          data: null,
          code: 0,
          message: "改变书籍状态成功"
        });
      } else {
        return res.status(200).json({
          data:null,
          code:1,
          message: "改变书籍状态失败"
        });
      }
    });
  },


  // ==========公共===========

  // 添加管理员账号时 上传头像
  adminUploadAvatar (req, res, next) {
    // 文件上传路径
    var form = new formidable.IncomingForm()
    // 新路径
    let Filepath = ''
    form.uploadDir='public/upload/img/tmp/' 
    // 新名字 要返回给客户端
    //文件的编码格式
    form.encoding = 'utf-8';
    //文件的后缀名
    form.keepExtensions  = true;
    //文件的大小限制
    form.maxFieldsSize = 2 * 1024 * 1024;

    form.parse(req, function (err, fields, files) {
      // 根据传入的上传文件夹来具体选择上传的所在路径
      var uploadDir=`public/upload/img/${fields.uploadDir}/`
      //文件的上传路径
      form.uploadDir = uploadDir;

      if (err) {
        return res.status(200).json({
          data:err,
          code:-1,
          message:"上传失败"
        });
      }

      Filepath = form.uploadDir  + files.file.name

      //为上传的文件重命名：其中files.file.path可以获取文件的上传路径
      fs.renameSync(files.file.path, Filepath)
    })

    //文件上传完成后执行
    form.on("end", function() {
      return res.status(200).json({
        data: {
          Filepath: Filepath
        },
        code: 0,
        message: "上传成功"
      });
    })
  }
}