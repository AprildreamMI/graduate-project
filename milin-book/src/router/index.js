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
  if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登陆
    if (cookie.get('is_login')) { // 判断是否已登陆
      next()
    } else {
      next('/login')
    }
  }
  next()
})

router.afterEach((to, from) => {
  bar.finish()
})

export default router
