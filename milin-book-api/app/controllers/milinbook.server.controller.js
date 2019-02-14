// 数据操作模块
var db = require('../models/milinbook.server.model')
var formidable = require('formidable'); //上传功能的插件
var fs = require('fs');
var async = require('async');
var urlPase = require('url');

// 检测是不是最高管理员
let isRoot =  (req, res) => {
  if (!req.cookies.admin_me) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<head><meta charset="utf-8"/></head>');
    res.end('<h1>错误！！！！没有权限</h1>');
    return res.send()
  }
  let admin_me = JSON.parse(req.cookies.admin_me)

  if (Number(admin_me.AdminFlag) < 3) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<head><meta charset="utf-8"/></head>');
    res.end('<h1>错误！！！！没有权限</h1>');
    return res.send()
  }
}

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

  // 获取所有管理员账号
  adminGetAccountAll (req, res, next) {
    isRoot(req, res)
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
    isRoot(req, res)
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
    isRoot(req, res)
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
    isRoot(req, res)
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

  // 更新账号信息
  adminUpdateAdminAccount (req, res, next) {
    isRoot(req, res)
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