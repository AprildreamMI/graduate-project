// 数据操作模块

var db = require('../models/milinbook.server.model')
var urlPase = require('url');

module.exports = {
  // 新闻的创建
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
  }
};