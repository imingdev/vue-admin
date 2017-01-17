/**
 * Created by zzmhot on 2017/1/13.
 * 主服务入口
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
import Vue from 'vue'
import router from './router'
import VueResource from 'vue-resource'
import store from 'vux/store'
import 'normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/scss/font-awesome.scss'
import Plugins from 'plugins'
import {API_SUCCESS, API_UNLOGIN, API_ERROR, url_user_info} from 'common/URL'
import App from './App'

// Resource
Vue.use(VueResource)

//引入Element 组件
Vue.use(ElementUI)

//引入插件
Vue.use(Plugins)

const commit = store.commit

//请求发送前的处理逻辑
Vue.http.interceptors.push((request, next) => {
  let isLoad = store.state.page_loading
  if (!isLoad) {
    commit('DATA_LOADING', true)
  }
  next((response) => {
    let _code = response.body.code
    let _msg = response.body.msg
    if (!isLoad) {
      setTimeout(function () {
        commit('DATA_LOADING', false)
      }, 200)
    }
    if (_code === API_UNLOGIN) {
      commit('USER_DATA', null)
      commit('AUTH_LOGIN', false)
      router.replace({name: "login"})
      Vue.prototype.$message({
        message: _msg,
        type: 'warning'
      })
      return false
    }
    if (_code === API_ERROR) {
      Vue.prototype.$message({
        message: _msg,
        type: 'error'
      })
      return false
    }
    if (_code === API_SUCCESS) {
      return response
    }
  })
})

Vue.http.options.emulateJSON = true;

//这样可以避免异步操作路由的不同步
Vue.http.get(url_user_info)
  .then(({data:{data, code, msg}}) => {
    commit('PAGE_LOADING', true)
    commit('DATA_LOADING', false)
    if (code == API_SUCCESS) {
      let isNull = data != null
      commit('USER_DATA', isNull ? data : null)
      commit('AUTH_LOGIN', isNull)
    }
    const app = new Vue({
      router: router,
      render: h => h(App)
    }).$mount('mainbody')
  })

window.router = router
