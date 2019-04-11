import {sessionStorage} from 'src/common/storage'

export default {
  // 用户信息和是否登录
  userInfo: sessionStorage.get('user_info')
}
