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
  set_user_info({commit}, {user, is_login}){
    let _user = user === null ? new Object() : user
    commit('SET_USER_INFO', _user)
    commit('SET_USER_LOGIN', is_login)
  }
}
