/**
 * Created by zzmhot on 2017/3/23.
 *
 * 主程序入口
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/23 18:19
 * @Copyright(©) 2017 by zzmhot.
 *
 */

//导入样式
import 'normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/scss/font-awesome.scss'
//导入Vue框架
import Vue from 'vue'
//导入组件
import router from './router'
import VueResource from 'vue-resource'
import NProgress from 'vue-nprogress'
//导入状态管理器
import store from 'store'
import {SET_USER_INFO} from 'store/actions/type'
//导入自定义插件
import Plugins from 'plugins'
//导入接口地址
import {port_user, port_code} from 'common/port_uri'
//导入主视图文件
import App from './App'

//设置用户信息action
const setUserInfo = function (user) {
  store.dispatch(SET_USER_INFO, user)
}

//使用自定义插件
Vue.use(Plugins)

//使用element-ui
Vue.use(ElementUI)

//使用vue-resource
Vue.use(VueResource)

//使用vue-nprogress
Vue.use(NProgress, {
  latencyThreshold: 100, // Number of ms before progressbar starts showing, default: 100,
  router: true, // Show progressbar when navigating routes, default: true
  http: false // Show progressbar when doing Vue.http, default: true
})

//vue-resource 请求发送前的处理逻辑
Vue.http.interceptors.push((request, next) => {
  next((response) => {
    let _code = response.body.code
    let _msg = response.body.msg
    if (_code === port_code.unlogin) {
      setUserInfo({
        user: null,
        is_login: false
      })
      router.replace({name: "login"})
      Vue.prototype.$message({
        message: _msg,
        type: 'warning'
      })
      return false
    }
    if (_code === port_code.error) {
      Vue.prototype.$message({
        message: _msg,
        type: 'error'
      })
      return false
    }
    if (_code === port_code.success) {
      return response
    }
  })
})

Vue.http.options.emulateJSON = true

//发布后是否显示提示
Vue.config.productionTip = false

//是否开启工具调试
Vue.config.devtools = false

//为避免登录延迟，先获取用户信息
Vue.http.get(port_user.info)
  .then(({data: {data, code, msg}}) => {
    if (code === port_code.success) {
      setUserInfo({
        user: data,
        is_login: true
      })
    }
    new Vue({
      router,
      store,
      nprogress: new NProgress({parent: '.nprogress-container'}),
      ...App
    }).$mount('mainbody')
  })
  .catch(({status, statusText}) => {
    Vue.prototype.$message({
      message: '操作失败！错误原因 ' + statusText + ' 状态码 ' + status,
      type: 'error'
    })
  })
