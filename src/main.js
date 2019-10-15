/**
 * @intro: 主程序入口.
 */

// 导入样式
import 'normalize.css'
import 'font-awesome/scss/font-awesome.scss'
import 'src/assets/scss/main.scss'
// 导入Vue框架
import Vue from 'vue'
// 导入element组件
import ElementUI from './element-ui'
// 导入组件
import components from './components'
// 导入路由
import router from './router'
// 导入状态管理器
import store from 'src/store'
// 导入请求框架
// import api from './api'
// 导入自定义插件
import plugin from './plugin'
// 导入主视图文件
import App from './App'

// 注册
Vue.use(ElementUI)
Vue.use(components)
Vue.use(plugin)

// 发布后是否显示提示
Vue.config.productionTip = false
// 只有开发时才开启工具
Vue.config.devtools = process.env.NODE_ENV === 'development'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('mainbody')
