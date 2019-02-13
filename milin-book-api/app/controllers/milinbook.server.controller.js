// 数据操作模块
var db = require('../models/milinbook.server.model')
var formidable = require('formidable'); //上传功能的插件
var fs = require('fs');
var urlPase = require('url');

// 检测是不是最高管理员
let isRoot =  (req, res) => {
  if (!req.cookies.admin_me) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<head><meta charset="utf-8"/></head>');
    res.end('<h1>错误！！！！没有权限获取账号列表</h1>');
    return res.send()
  }
  let admin_me = JSON.parse(req.cookies.admin_me)

  if (Number(admin_me.AdminFlag) < 3) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<head><meta charset="utf-8"/></head>');
    res.end('<h1>错误！！！！没有权限获取账号列表</h1>');
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
    let sql = `SELECT * FROM tb_manager`
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(200).json({
          data:null,
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

  // 添加管理员账号时 上传头像
  adminUploadAvatar (req, res, next) {
    // 文件上传路径
    var uploadDir='public/upload/img/adminAvatar/';
    var form = new formidable.IncomingForm();
    // 新路径
    let newAvatarPath = ''
    // 新名字 要返回给客户端
    let newName = ''
    //文件的编码格式
    form.encoding = 'utf-8';
    //文件的上传路径
    form.uploadDir = uploadDir;
    //文件的后缀名
    form.keepExtensions  = true;
    //文件的大小限制
    form.maxFieldsSize = 2 * 1024 * 1024;
    console.log('req', req)

    form.parse(req, function (err, fields, files) {
      if (err) {
        return res.status(200).json({
          data:null,
          code:-1,
          message:"上传头像失败"
        });
      }

      let type = files.file.type === 'image/jpeg'? '.jpg' : '.png'
      let randomNumber = Math.floor(Math.random() * 100)
      newAvatarPath = form.uploadDir  + files.file.name
      newName = fields.name + '-' + randomNumber + type

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