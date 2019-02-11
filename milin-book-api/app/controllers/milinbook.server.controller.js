// 数据操作模块

var db = require('../models/milinbook.server.model')
var urlPase = require('url');

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
    console.log('body', req.body)
    let sql = `SELECT * FROM tb_manager where AdminAccount = "${req.body.AdminAccount}"`
    console.log('sql', sql)
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
  }
};