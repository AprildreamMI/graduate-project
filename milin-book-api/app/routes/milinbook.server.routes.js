var MilinBookController = require('../controllers/milinbook.server.controller');


module.exports = function(app){
  // 测试
  // 监听url 调用数据操作模块中的方法
  app.route('/api/test')
    .get(MilinBookController.getAll)
  
  /* 
    后台管理 start
  */

  // 登陆
  app.route('/api/admin/login')
    .post(MilinBookController.adminLogin)
};