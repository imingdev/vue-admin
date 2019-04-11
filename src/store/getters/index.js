import {GET_USER_INFO, GET_IS_LOGIN} from 'src/store/getters/type'

export default {
  // 获取用户信息
  [GET_USER_INFO]: state => {
    return state.userInfo || {}
  },
  // 判断是否登录
  [GET_IS_LOGIN]: state => !!state.userInfo && JSON.stringify(state.userInfo) !== '{}'
}
