import Vue from 'vue'
import Router from 'vue-router'
import ProgressBar from '../components/progress-bar.vue'
import cookie from '../utils/cookie'

// 全局进度条
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

Vue.use(Router)

const routes = [
  // 重定向登录页
  {
    path: '/',
    component: () => import('../views/test/test-01.vue')
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
        component: () => import('../views/admin/stats')
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
        component: () => import('../views/admin/account/userAccount')
      }
    ]
  }
  /* // 登录页
  {
    path: '/login',
    component: () => import('../views/login')
  },
  // 方案管理系统
  {
    path: '/scheme',
    // 重定向跳转到人员管理页面
    redirect: '/scheme/home',
    component: () => import('../views/scheme'),
    children: [
      {
        // 没有选中某一个具体展示方案 列出的是全部的展示方案
        path: 'home',
        component: () => import('../views/scheme/home')
      },
      {
        // 选中的某一个展示方案的展示看板
        path: 'panelFolder/:id',
        component: () => import('../views/scheme/panelFolder')
      },
      {
        // 回收站
        path: 'deleteFolder',
        component: () => import('../views/scheme/deleteFolder')
      }
    ]
  },
  // 看板详情
  {
    path: '/panel/:id',
    component: () => import('../views/panel')
  } */
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
      next('/login')
    }
    // 判断需要管理员账号登录
  } else if (to.matched.some(res => res.meta.requireAuthAdmin)) {
    if (cookie.get('admin_me')) { // 判断是否已登陆
      next()
    } else {
      next('/admin/login')
    }
  }
  next()
})

router.afterEach((to, from) => {
  bar.finish()
})

export default router
