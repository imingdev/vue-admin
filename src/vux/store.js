/**
 * Created by admin on 2016/11/28.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //页面切换loading
    page_loading: false,
    //数据加载loading
    date_loading: false,
    //判断是否登录
    auth_login: false,
    //登录之后的用户信息
    user_data: new Object(),
    //是否全屏（因为登录页和404页面不是和其他页面在同一标签里边）
    content_show: true,
    //自定义菜单(暂行)
    wx_menu_button: null
  },
  getters: {
    wx_menu_button: state => {
      let _menu = state.wx_menu_button
      let _result = _menu == null ? [] : JSON.parse(_menu)
      return _result
    }
  },
  mutations: {
    PAGE_LOADING (state, status) {
      state.page_loading = status
    },
    DATA_LOADING (state, status) {
      state.date_loading = status
    },
    AUTH_LOGIN(state, status) {
      state.auth_login = status
    },
    USER_DATA(state, status) {
      state.user_data = status
    },
    CONTENT_SHOW(state, status) {
      state.content_show = status
    },
    WX_MENU_BUTTON(state, status) {
      let result
      if (status == null || status.length == 0) {
        result = null
      } else {
        result = JSON.stringify(status)
      }
      state.wx_menu_button = result
    }
  }
})
