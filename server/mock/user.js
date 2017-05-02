/**
 * Created by zzmhot on 2017/3/21.
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/21 10:55
 * @Copyright(©) 2017 by zzmhot.
 *
 */

var Mock = require('mockjs')
var port_code = require('../../src/common/port_uri').port_code

exports.login = Mock.mock({
  code: port_code.success,
  msg: "登录成功",
  data: {
    'name': '@cname',
    'avatar': 'https://avatars0.githubusercontent.com/u/16893554?v=3&s=240',
    'age|20-25': 20,
    'desc': '@csentence()'
  }
})

exports.login_error = Mock.mock({
  code: port_code.error,
  msg: "账号或密码错误"
})

exports.logout = Mock.mock({
  code: port_code.success,
  msg: "退出成功"
})
