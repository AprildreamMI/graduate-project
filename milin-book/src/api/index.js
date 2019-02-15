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
  后台管理 start
*/
export const adminLogin = (data) => post('/admin/login', data)

// 获取管理员账号列表
export const adminGetAccountAll = () => get('/admin/getAccountAll')

// 添加管理员账号
export const adminAddAdminAccount = (data) => post('/admin/addAdminAccount', data)

// 删除管理员账号
export const deleteAdminAccount = (data) => remove('/admin/deleteAdminAccount', data)

// 更新管理员账号状态
export const adminUpdateAdminAccountStatus = (data) => put('/admin/updateAdminAccountStatus', data)

// 更新管理员账号信息
export const adminUpdateAdminAccount = (data) => put('/admin/updateAdminAccount', data)

// 更新登陆账号的密码 id 在cookie 中 无需传递id
export const adminUpdateAdminPwd = (data) => put('/admin/updateAdminPwd', data)
