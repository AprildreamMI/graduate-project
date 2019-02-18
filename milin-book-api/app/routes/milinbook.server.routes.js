var MilinBookController = require('../controllers/milinbook.server.controller');


module.exports = function(app){
  // 测试
  // 监听url 调用数据操作模块中的方法
  app.route('/api/test')
    .get(MilinBookController.getAll)

  /* 
    客户前台 start
  */

  // 前台登陆
  app.route('/api/shop/login')
    .post(MilinBookController.shopLogin)

  // 前台注册
  app.route('/api/shop/signIn')
    .post(MilinBookController.shopSignIn)

 
  /* 
    客户前台 end
  */

  // ===================================================================================================================


  /* 
    后台管理 start
  */

  // 登陆
  app.route('/api/admin/login')
    .post(MilinBookController.adminLogin)
  
  // ==========管理员列表管理================

  // 获取所用的管理员账户
  app.route('/api/admin/getAccountAll')
    .get(MilinBookController.adminGetAccountAll)

  // 添加管理员账号
  app.route('/api/admin/addAdminAccount')
    .post(MilinBookController.adminAddAdminAccount)

  // 删除管理员账号
  app.route('/api/admin/deleteAdminAccount')
    .delete(MilinBookController.adminDeleteAdminAccount)
  
  // 更新管理员账号状态
  app.route('/api/admin/updateAdminAccountStatus')
    .put(MilinBookController.adminUpdateAdminAccountStatus)

  // ==========用户列表管理===========

  // 获取所有的用户列表数据
  app.route('/api/admin/getUserList')
    .get(MilinBookController.adminGetUserAccountList)

  // 更改用户账号状态
  app.route('/api/admin/changeUserStatus')
    .put(MilinBookController.adminChangeUserAccountStatus)

  // 删除用户
  app.route('/api/admin/deleteUserAccount')
    .delete(MilinBookController.adminDeleteUserAccount)

  
  // ==========书籍管理===========

  //  获取书籍类型列表
  app.route('/api/admin/getBookTypeList')
    .get(MilinBookController.adminGetBookTypeList)

  // 获取书籍列表
  app.route('/api/admin/getBookList')
    .get(MilinBookController.adminGetBookList)

  // 添加书籍
  app.route('/api/admin/addBookInfo')
    .post(MilinBookController.adminAddBookInfo)
  
  // 编辑书籍信息
  app.route('/api/admin/updateBookInfo')
    .put(MilinBookController.adminUpdateBookInfo)

  // 编辑书籍信息
  app.route('/api/admin/updateBookStatus')
    .put(MilinBookController.adminUpdateBookStatus)

  // ==========当前管理员账号管理===========


  // 更新当前管理员账号信息
  app.route('/api/admin/updateAdminAccount')
    .put(MilinBookController.adminUpdateAdminAccount)

  // 当前管理员账号修改密码
  app.route('/api/admin/updateAdminPwd')
    .put(MilinBookController.adminUpdateAdminPwd)

  // 上传文件
  app.route('/api/admin/upload')
    .post(MilinBookController.adminUploadAvatar)


  /* 
    后台管理 end
  */

};