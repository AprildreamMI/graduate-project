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

  // 前台注册
  app.route('/api/shop/getBookList')
    .get(MilinBookController.shopGetBookList)

  // 加入购物车
  app.route('/api/shop/addShopCar')
    .post(MilinBookController.shopAddShopCar)

  // 获取购物车中数量
  app.route('/api/shop/getShopCarCount')
    .get(MilinBookController.shopGetShopCarCount)

  // 获取订单数量
  app.route('/api/shop/getOrderCount')
    .get(MilinBookController.shopGetOrderCount)

  // 添加订单 状态为未付款
  app.route('/api/shop/addOrder')
    .post(MilinBookController.shopAddOrder)

  // 获取当前账号购物车中的商品
  app.route('/api/shop/getUserShopCarGoods')
    .get(MilinBookController.shopGetUserShopCarGoods)

  // 传入购物车中商品的ID 进行删除
  app.route('/api/shop/DeleteUserShopCarGoods')
    .delete(MilinBookController.shopDeleteUserShopCarGoods)

  // 获取当前账号的订单
  app.route('/api/shop/getUserOrderList')
    .get(MilinBookController.shopGetUserOrderList)

  // 传入订单中商品的订单ID 进行删除
  app.route('/api/shop/DeleteUserOrderGoods')
    .delete(MilinBookController.shopDeleteUserOrderGoods)

  // 传入订单中商品的订单ID 更改状态 为已支付未发货
  app.route('/api/shop/updateUserOrderGoodsNoShip')
    .put(MilinBookController.shopUpdateUserOrderGoodsNoShip)

  // 传入订单中商品的订单ID 更改状态 已收货
  app.route('/api/shop/updateUserOrderGoodsReceipt')
    .put(MilinBookController.shopUpdateUserOrderGoodsReceipt)

 
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

  // 获取用户的总数量
  app.route('/api/admin/getUserCount')
    .get(MilinBookController.adminGetUserCount)

  // 获取书籍的总数量
  app.route('/api/admin/getBookCount')
    .get(MilinBookController.adminGetBookCount)

  // 获取订单的总数量
  app.route('/api/admin/getOrderCount')
    .get(MilinBookController.adminGetOrderCount)

  // 获取各个分类书籍的数量
  app.route('/api/admin/getTypeBookCount')
    .get(MilinBookController.adminGetTypeBookCount)

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

  // ==========订单管理===========

  // 编辑书籍信息
  app.route('/api/admin/getrOrderList')
    .get(MilinBookController.adminGetrOrderList)

  app.route('/api/admin/updateOrderShip')
    .put(MilinBookController.adminUpdateOrderShip)



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