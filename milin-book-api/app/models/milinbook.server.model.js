// 数据库连接生成模块

// 导入模块
var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'asdzxc456',
    database:'milinbook'
});

// 建立连接
connection.connect();

// 导出连接
module.exports = connection