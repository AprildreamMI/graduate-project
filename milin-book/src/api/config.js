import axios from 'axios'
// import cookie from '~/utils/cookie'

// node de 服务器地址
export const baseURL = 'http://localhost:3000/api'
// 30秒中断请求
axios.defaults.timeout = 30000
// 请求携带 cookies
axios.defaults.withCredentials = true

// 拦截发送请求
axios.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 拦截返回结果
axios.interceptors.response.use(
  res => {
    if (res.status === 200) {
    }
    return res
  },
  err => {
    return Promise.reject(err)
  }
)

/**
 * request封装
 * 拦截响应请求
 */
function fetchData (method, url, data = {}) {
  return new Promise((resolve, reject) => {
    let request
    if (method === 'get' || method === 'delete') {
      request = axios[method](baseURL + url, { params: data })
    } else {
      request = axios[method](baseURL + url, data)
    }
    request
      .then(res => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export function get (url, params) {
  return fetchData('get', url, params)
}

export function post (url, data) {
  return fetchData('post', url, data)
}

export function put (url, data) {
  return fetchData('put', url, data)
}

export function remove (url, params) {
  return fetchData('delete', url, params)
}

export function upload (url, data) {
  const formData = new FormData()
  Object.keys(data).forEach((child) => {
    formData.append(child, data[child])
  })
  return post(url, formData)
}
