import * as type from 'src/store/mutations/type'
import {cookieStorage} from 'src/common/storage'

export default {
  // 设置用户信息和是否登录
  [type.SET_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo || {}
    if (userInfo === null) {
      cookieStorage.remove('user_info')
    } else {
      cookieStorage.set('user_info', userInfo)
    }
  }
}
