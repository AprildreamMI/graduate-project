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
  
  // 获取所用的管理员账户
  app.route('/api/admin/getAccountAll')
    .get(MilinBookController.adminGetAccountAll)

  // 添加管理员账号
  app.route('/api/admin/addAdminAccount')
    .post(MilinBookController.adminAddAdminAccount)

  // 删除管理员账号
  app.route('/api/admin/deleteAdminAccount')
    .delete(MilinBookController.adminDeleteAdminAccount)
  
  // 更新账号状态
  app.route('/api/admin/updateAdminAccountStatus')
    .put(MilinBookController.adminUpdateAdminAccountStatus)

  // 更新账号信息
  app.route('/api/admin/updateAdminAccount')
    .put(MilinBookController.adminUpdateAdminAccount)

  // 上传文件
  app.route('/api/admin/upload')
    .post(MilinBookController.adminUploadAvatar)

};