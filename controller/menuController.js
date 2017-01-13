/**
 * Created by admin on 2016/12/9.
 */
const URL = require('../src/common/URL')

module.exports = function (apiRouter) {
  //获取自定义菜单
  apiRouter.get(URL.url_menu_info, function (req, res) {
    let result = require("../json/menuData.json");
    res.json({
      code: URL.API_SUCCESS,
      msg: "成功",
      data: result
    })
  });
  //提交自定义菜单
  apiRouter.post(URL.url_menu_save, function (req, res) {
    res.json({
      code: URL.API_SUCCESS,
      msg: "成功"
    })
  });
}
