import * as actions from 'src/store/actions/type'
import * as mutations from 'src/store/mutations/type'

export default {
  // 设置用户信息和登录
  [actions.SET_USER_INFO] ({commit}, userInfo) {
    commit(mutations.SET_USER_INFO, userInfo)
  }
}
