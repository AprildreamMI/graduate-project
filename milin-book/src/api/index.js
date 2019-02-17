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

export const shopSignIn = (data) => post('/shop/signIn', data)

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

// =========当前管理员账号管理=================

// 更新当前管理员账号信息
export const adminUpdateAdminAccount = (data) => put('/admin/updateAdminAccount', data)

// 更新登陆账号的密码 id 在cookie 中 无需传递id
export const adminUpdateAdminPwd = (data) => put('/admin/updateAdminPwd', data)
