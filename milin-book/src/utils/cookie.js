import Cookies from 'js-cookie'

// 开发
const isDev = process.env.NODE_ENV === 'development'

// 生产
const isProd = process.env.NODE_ENV === 'production'

const config = {
  domain: isDev ? 'localhost' : isProd ? 'localhost' : 'localhost'
}

export default {
  get (key) {
    return Cookies.get(key, config)
  },
  set (key, value) {
    // 5 天过期
    Cookies.set(key, value, Object.assign({ expires: 5 }, config))
  },
  remove (key) {
    Cookies.remove(key, config)
  }
}
