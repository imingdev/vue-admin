import {cookieStorage} from 'src/common/storage'

export default {
  // 用户信息和是否登录
  userInfo: cookieStorage.get('user_info')
}
