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

import * as actions from 'store/actions/type'
import * as mutations from 'store/mutations/type'

export default {
  //设置用户信息和登录
  [actions.SET_USER_INFO]({commit}, {user, is_login}){
    let _user = user === null ? {} : user
    commit(mutations.SET_USER_INFO, _user)
    commit(mutations.SET_USER_LOGIN, is_login)
  }
}
