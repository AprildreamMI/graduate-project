// 初始化Express 框架

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

module.exports  = function(){
  console.log('init expesss...');
  var app = express();

  
  // 配置中间件
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  // app.use(express.static("./public"));

  // app.use(cors());
  //2.0 将所有api的请求响应content-type设置为application/json
  app.all('/api/*', (req, res, next) => {
    //设置允许跨域响应报文头
    //设置跨域
    // 启用 Node 服务器端的 cors 跨域
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With, mytoken")
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization")
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.setHeader('Content-Type','application/json;charset=utf-8')
    if(req.method == "OPTIONS") {
      res.send(200);
    }
    else {
      next()
    }
  });

  require('../app/routes/milinbook.server.routes')(app);

  // 处理所有未知的请求
  app.use(function(req, res, next){
    res.status(404);
    try {
      return res.json('Not Found');
    } catch(e) {
      console.error('404 set header after sent');
    } 
  });

  // 统一处理出错的情况
  app.use(function(err, req, res, next){
    if(!err) {return next()}
    res.status(500);
    try {
      return res.json(err.message || 'server error');
    } catch(e) {
      console.error('500 set header after sent');
    }
  });

  return app;
};