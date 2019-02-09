import Cookies from 'js-cookie'

const isDev = process.env.NODE_ENV === 'development'

const isProd = process.env.NODE_ENV === 'production'

const config = {
  domain: isDev ? 'localhost' : isProd ? 'yoyohr.com' : '192.168.1.124'
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
