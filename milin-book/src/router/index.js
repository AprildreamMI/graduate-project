import Vue from 'vue'
import Router from 'vue-router'
import ProgressBar from '../components/progress-bar.vue'
import cookie from '../utils/cookie'

// 全局进度条
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

Vue.use(Router)

const routes = [
  // 等前台做好后 项目重定向为 商城首页
  // 重定向登录页
  {
    path: '/',
    redirect: '/shop/home'
  },
  // 客户端 有登陆页 注册在登录时
  {
    path: '/shop/login',
    component: () => import('../views/shop/login')
  },
  {
    path: '/shop/home',
    component: () => import('../views/shop/home')
  },
  {
    path: '/shop/shopCar',
    component: () => import('../views/shop/shopCar'),
    meta: {
      requireAuthUser: true
    }
  },
  {
    path: '/shop/shopOrder',
    component: () => import('../views/shop/order'),
    meta: {
      requireAuthUser: true
    }
  },
  // 后台管理登陆页面
  {
    path: '/admin/login',
    component: () => import('../views/admin/login')
  },
  // 后台主页
  {
    path: '/admin',
    component: () => import('../views/admin'),
    redirect: '/admin/stats',
    meta: {
      requireAuthAdmin: true
    },
    children: [
      {
        path: 'stats',
        component: () => import('../views/admin/stats'),
        redirect: '/admin/stats/typeBook',
        children: [
          {
            path: 'typeBook',
            component: () => import('../views/admin/stats/typeBook')
          }
        ]
      },
      {
        path: 'account/adminAccount',
        component: () => import('../views/admin/account/adminAccount'),
        meta: {
          requireAuthAdminAccount: true
        }
      },
      {
        path: 'account/userAccount',
        component: () => import('../views/admin/account/userAccount'),
        meta: {
          requireAuthAdminAccount: true
        }
      },
      {
        path: 'books',
        component: () => import('../views/admin/books'),
        meta: {
          requireAuthAdminBooks: true
        }
      },
      {
        path: 'order',
        component: () => import('../views/admin/order'),
        meta: {
          requireAuthAdminBooks: true
        }
      }
    ]
  }
]

const router = new Router({
  mode: 'history',
  routes,
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  bar.start()
  // 判断是否需要普通用户登陆
  if (to.matched.some(res => res.meta.requireAuthUser)) {
    if (cookie.get('user_me')) { // 判断是否已登陆
      next()
    } else {
      next('/shop/login')
    }
    // 判断需要管理员账号登录
    // some()是对数组中每一项运行给定函数，如果该函数对任一项返回true，则返回true。
  } else if (to.matched.some(res => res.meta.requireAuthAdmin)) {
    // 判断管理员是否已登陆
    if (cookie.get('admin_me')) {
      // 判断是不是最高权限管理员
      if (to.meta.requireAuthAdminAccount && !(Number(JSON.parse(cookie.get('admin_me')).AdminFlag) < 3)) {
        next()
      } else if (to.meta.requireAuthAdminBooks && !(Number(JSON.parse(cookie.get('admin_me')).AdminFlag) < 2)) {
        next()
      } else if (!(Number(JSON.parse(cookie.get('admin_me')).AdminFlag) < 1)) {
        next()
      } else {
        next('/admin/login')
      }
    } else {
      next('/admin/login')
    }
  }
  next()
})

router.afterEach((to, from) => {
  bar.finish()
})

console.log('\n ' + '%c 密林的书店 ' + '%c Verison 1.0 ' + '%c Github ' + '%c https://github.com/AprildreamMI/graduate-project\t ' + '%c 赵思 ' + '%c 简单的毕业设计 \n\n', 'color: #f1f1f1; background: #000000; padding:5px 0;', 'background: #65E0DD; padding:5px;', 'color: #555555; background: #F6B897; padding:5px; margin-left:15px;', 'background: #DD5F89; padding:5px;', 'background: #EA4335; padding:5px;margin-left:15px;', 'color: white; background: #4285F4; padding:5px 0; margin-top: 10px;')

export default router
