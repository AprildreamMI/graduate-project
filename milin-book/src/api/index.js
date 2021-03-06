/*
  ===================================
    定义请求后端API接口
  ===================================
*/

// import { get, post, put, remove } from './config'
import { get, post, remove, put } from './config'

// 测试接口 要在Node 服务器中开启跨越请求
export const getAll = () => get(`/test`)

/*
  export const deleteModule = (id, data) => remove(`/api/v1/portal/modules/${id}`, data)
*/

/*
  客户前台 start
*/

// 前台登陆
export const shopLogin = (data) => post('/shop/login', data)

// 前台注册
export const shopSignIn = (data) => post('/shop/signIn', data)

// 用户修改密码
export const shopUpdateUserPwd = (data) => put('/shop/updateUserPwd', data)

// 获取图书列表
export const shopGetBookList = (data) => get('/shop/getBookList', data)

// 添加到购物车
export const shopAddShopCar = (data) => post('/shop/addShopCar', data)

// 获取购物车中的数量
export const shopGetShopCarCount = () => get('/shop/getShopCarCount')

// 获取订单中的数量
export const shopGetOrderCount = () => get('/shop/getOrderCount')

// 添加订单 状态为未付款
export const shopAddOrder = (data) => post('/shop/addOrder', data)

// 获取当前登录用户在购物车中的商品列表
export const shopGetUserShopCarGoods = () => get('/shop/getUserShopCarGoods')

// 获取当前登录用户的订单列表
export const shopGetUserOrderList = () => get('/shop/getUserOrderList')

// 在购物车中对商品就行删除
export const shopDeleteUserShopCarGoods = (data) => remove('/shop/DeleteUserShopCarGoods', data)

// 在订单中对商品就行删除 传入id
export const shopDeleteUserOrderGoods = (data) => remove('/shop/DeleteUserOrderGoods', data)

// 在订单中对商品就行更新为已支付 传入id
export const shopUpdateUserOrderGoodsNoShip = (data) => put('/shop/updateUserOrderGoodsNoShip', data)

// 在订单中对商品就行更新为已收货 传入id
export const shopUpdateUserOrderGoodsReceipt = (data) => put('/shop/updateUserOrderGoodsReceipt', data)

/*
  客户前台 end
*/

// ==================================================================

/*
  后台管理 start
*/
export const adminLogin = (data) => post('/admin/login', data)

// =========管理员账号管理=================

// 获取管理员账号列表
export const adminGetAccountAll = () => get('/admin/getAccountAll')

// 获取用户的数量
export const adminGetUserCount = () => get('/admin/getUserCount')

// 获取书籍的数量
export const adminGetBookCount = () => get('/admin/getBookCount')

// 获取订单的数量
export const adminGetOrderCount = () => get('/admin/getOrderCount')

// 获取分类书籍的数量
export const adminGetTypeBookCount = () => get('/admin/getTypeBookCount')

// 添加管理员账号
export const adminAddAdminAccount = (data) => post('/admin/addAdminAccount', data)

// 删除管理员账号
export const deleteAdminAccount = (data) => remove('/admin/deleteAdminAccount', data)

// 更新管理员账号状态
export const adminUpdateAdminAccountStatus = (data) => put('/admin/updateAdminAccountStatus', data)

// =========用户账号管理=================

// 分页及带查询条件获取用户列表
export const adminGetUserList = (data) => get('/admin/getUserList', data)

// 分页及带查询条件获取用户列表
export const adminChangeUserStatus = (data) => put('/admin/changeUserStatus', data)

// 删除用户账号
export const adminDeleteUserAccount = (data) => remove('/admin/deleteUserAccount', data)

// =========书籍列表管理=================

// 获取书籍分类数据
export const adminGetBookTypeList = () => get('/admin/getBookTypeList')

// 获取书籍列表
export const adminGetBookList = (data) => get('/admin/getBookList', data)

// 添加书籍
export const adminAddBookInfo = (data) => post('/admin/addBookInfo', data)

// 添加书籍
export const adminUpdateBookInfo = (data) => put('/admin/updateBookInfo', data)

// 改变书籍状态
export const adminUpdateBookStatus = (data) => put('/admin/updateBookStatus', data)

// =========订单列表管理=================

// 获取全部订单
export const adminGetrOrderList = () => get('/admin/getrOrderList')

// 获取全部订单
export const adminUpdateOrderShip = (data) => put('/admin/updateOrderShip', data)

// =========当前管理员账号管理=================

// 更新当前管理员账号信息
export const adminUpdateAdminAccount = (data) => put('/admin/updateAdminAccount', data)

// 更新登陆账号的密码 id 在cookie 中 无需传递id
export const adminUpdateAdminPwd = (data) => put('/admin/updateAdminPwd', data)
