// 数据操作模块
var db = require('../models/milinbook.server.model')
var formidable = require('formidable'); //上传功能的插件
var fs = require('fs');
var async = require('async');
var urlPase = require('url');

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
          code: 0,
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
    console.log('body', req.body)
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
    console.log('获取用户列表', req.body)
    async.waterfall([
      callback => {
        let sql = `SELECT count(*) AS total FROM tb_customerinfo WHERE CustomerName LIKE '%${req.body.searchText}%'`
        db.query(sql, (err, result) => {
          callback(err, result[0].total)
        })
      },
      (total, callback) => {
        let skip = (req.body.pageNum - 1) * req.body.pageSize
        console.log('total', total)
        console.log('skip', skip)
        let sql = `SELECT * FROM tb_customerinfo LIMIT ${Number(skip)}, ${Number(req.body.pageSize)}`
        db.query(sql, (err, result) => {
          callback(err, result)
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
            userList: results
          },
          code: 0,
          message: "获取用户账号列表成功"
        })
      }
    })
  },


  // 添加管理员账号时 上传头像
  adminUploadAvatar (req, res, next) {
    // 文件上传路径
    var uploadDir='public/upload/img/adminAvatar/';
    var form = new formidable.IncomingForm();
    // 新路径
    let newAvatarPath = ''
    // 新名字 要返回给客户端
    //文件的编码格式
    form.encoding = 'utf-8';
    //文件的上传路径
    form.uploadDir = uploadDir;
    //文件的后缀名
    form.keepExtensions  = true;
    //文件的大小限制
    form.maxFieldsSize = 2 * 1024 * 1024;

    form.parse(req, function (err, fields, files) {
      if (err) {
        return res.status(200).json({
          data:err,
          code:-1,
          message:"上传头像失败"
        });
      }

      newAvatarPath = form.uploadDir  + files.file.name

      //为上传的文件重命名：其中files.file.path可以获取文件的上传路径
      fs.renameSync(files.file.path, newAvatarPath)
    })

    //文件上传完成后执行
    form.on("end", function() {
      return res.status(200).json({
        data: {
          newAvatarPath: newAvatarPath
        },
        code: 0,
        message: "上传头像成功"
      });
    })
  }
}