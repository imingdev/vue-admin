/**
 * Created by zzmhot on 2017/3/23.
 *
 * 路由Map
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/23 18:30
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),
const routes = [{
  path: '/home',
  name: 'home',
  components: {
    default: require('pages/home'),
    menuView: require('components/leftSlide')
  },
  meta: {
    title: "主页",
    auth: true
  }
}, {
  path: '/table/base',
  name: 'tableBase',
  components: {
    default: require('pages/table/base'),
    menuView: require('components/leftSlide')
  },
  meta: {
    title: "基本表格",
    auth: true
  }
}, {
  path: '/table/sort',
  name: 'tableSort',
  components: {
    default: require('pages/table/sort'),
    menuView: require('components/leftSlide')
  },
  meta: {
    title: "排序表格",
    auth: true
  }
}, {
  path: '/table/update/:id',
  name: 'tableUpdate',
  components: {
    default: require('pages/table/save'),
    menuView: require('components/leftSlide')
  },
  meta: {
    title: "数据修改",
    auth: true
  }
}, {
  path: '/table/add',
  name: 'tableAdd',
  components: {
    default: require('pages/table/save'),
    menuView: require('components/leftSlide')
  },
  meta: {
    title: "添加数据",
    auth: true
  }
}, {
  path: '/charts/bar',
  name: 'chartsBar',
  components: {
    default: require('pages/charts/bar'),
    menuView: require('components/leftSlide')
  },
  meta: {
    title: "柱状图表",
    auth: true
  }
}, {
  path: '/user/login',
  name: 'login',
  components: {
    fullView: require('pages/user/login')
  }
}, {
  path: '',
  redirect: '/home'
}, {
  path: '*',
  name: 'notPage',
  components: {
    fullView: require('pages/error/404')
  }
}]

const router = new VueRouter({
  routes,
  mode: 'hash', //default: hash ,history
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
  NProgress.start()
  let toName = to.name
  // let fromName = from.name
  let is_login = store.state.user_info.login

  if (!is_login && toName !== 'login') {
    next({
      name: 'login'
    });
  } else {
    if (is_login && toName === 'login') {
      next({
        path: '/'
      });
    } else {
      next()
    }
  }

})

//路由完成之后的操作
router.afterEach(route => {
  NProgress.done()
})

export default router
