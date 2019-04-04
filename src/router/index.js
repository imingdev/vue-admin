/**
 * @intro: 路由配置.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Store from 'src/store'
import {GET_IS_LOGIN} from 'src/store/getters/type'
import {UserLogin} from './auto-routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'hash', // default: hash ,history
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

// 全局路由配置
// 路由开始之前的操作
router.beforeEach((to, from, next) => {
  if (from.path !== '/') {
    NProgress.done().start()
  }

  const isLogin = Store.getters[GET_IS_LOGIN]
  const auth = to.meta.auth

  if (auth === false || auth === 'false') {
    // 不需要验证的
    next()
  } else {
    // 已经登录的继续执行，没登录就跑到登录页面中去
    isLogin ? next() : router.replace(UserLogin.path)
  }
})

// 路由完成之后的操作
router.afterEach(route => {
  NProgress.done()
})

export default router
