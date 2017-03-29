/**
 * Created by zzmhot on 2017/3/21.
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/21 16:04
 * @Copyright(©) 2017 by zzmhot.
 *
 */

export default {
  //设置用户信息
  SET_USER_INFO(state, status){
    state.user_info = status
  },
  //设置用户是否登录
  SET_USER_LOGIN(state, status){
    state.user_login = status
  }
}
