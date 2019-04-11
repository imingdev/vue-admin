import fetch from 'src/fetch'
import * as userUrl from '../constant/user'

// 登录
export const login = (data) => {
  return fetch({
    url: userUrl.login,
    method: 'post',
    data
  })
}
// 登出
export const logout = () => {
  return fetch({
    url: userUrl.logout,
    method: 'post'
  })
}
