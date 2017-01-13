/**
 * Created by zzmhot on 2017/1/13.
 * 路由配置
 */
////////////////////////////////////////////////////////////////////
//                          _ooOoo_                               //
//                         o8888888o                              //
//                         88" . "88                              //
//                         (| ^_^ |)                              //
//                         O\  =  /O                              //
//                      ____/`---'\____                           //
//                    .'  \\|     |//  `.                         //
//                   /  \\|||  :  |||//  \                        //
//                  /  _||||| -:- |||||-  \                       //
//                  |   | \\\  -  /// |   |                       //
//                  | \_|  ''\---/''  |   |                       //
//                  \  .-\__  `-`  ___/-. /                       //
//                ___`. .'  /--.--\  `. . ___                     //
//              ."" '<  `.___\_<|>_/___.'  >'"".                  //
//            | | :  `- \`.;`\ _ /`;.`/ - ` : | |                 //
//            \  \ `-.   \_ __\ /__ _/   .-` /  /                 //
//      ========`-.____`-.___\_____/___.-`____.-'========         //
//                           `=---='                              //
//      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^       //
//       佛祖保佑            永无BUG              永不修改            //
////////////////////////////////////////////////////////////////////
/*
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/1/13 14:15
 * @Copyright(©) 2017 by zzmhot.
 *
 */
import store from 'vux/store'

export function configRouter(VueRouter) {

  //使用AMD方式加载
  // component: resolve => require(['pages/home'], resolve),
  const routes = process.env.NODE_ENV === 'development' ? require('./router/dev.router.config') : require('./router/prod.router.config')
  const router = new VueRouter({
    mode: 'history',
    base: process.env.routerBase,
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return {x: 0, y: 0}
      }
    },
    routes // （缩写）相当于 routes: routes
  })

  const commit = store.commit
  //全局路由配置
  //路由开始之前的操作
  router.beforeEach((to, from, next) => {
    commit('PAGE_LOADING', true)
    commit('CONTENT_SHOW', true)
    let toName = to.name
    let fromName = from.name

    let isLogin = store.state.auth_login
    if (isLogin && toName == "login") {
      router.replace({path: "/"})
    }
    if (to.matched.some(record => record.meta.authVerify)) {
      if (!isLogin) {
        router.replace({name: "login"})
      } else {
        next()
      }
    } else {
      next()
    }
  })

  //路由完成之后的操作
  router.afterEach(route => {
    let routeName = route.name
    // console.log("到 " + routeName)
    setTimeout(function () {
      commit('PAGE_LOADING', false)
    }, 200)
  })

  return router
}
