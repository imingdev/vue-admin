/**
 * Created by admin on 2016/12/6.
 */
const URL = require('../src/common/URL')

module.exports = function (apiRouter) {
  //获取用户信息
  apiRouter.get(URL.url_user_info, function (req, res) {
    let result = require("../json/userInfoData.json");
    res.json({
      code: URL.API_SUCCESS,
      msg: "成功",
      data: result
    })
  });
  //用户登录
  apiRouter.post(URL.url_user_login, function (req, res) {
    let result = require("../json/loginData.json");
    res.json({
      code: URL.API_SUCCESS,
      msg: "成功",
      data: result
    })
  });
  //用户退出
  apiRouter.post(URL.url_user_logout, function (req, res) {
    res.json({
      code: URL.API_SUCCESS,
      msg: "成功"
    })
  });
}
