/**
 * Created by admin on 2016/12/5.
 */
const URL = require('../src/common/URL')

module.exports = function (apiRouter) {
  //统计概况
  apiRouter.get(URL.url_count_over_view, function (req, res) {
    let result = require("../json/overViewData.json");
    res.json({
      code: URL.API_SUCCESS,
      msg: "成功",
      data: result
    })
  });
  //注册统计
  apiRouter.get(URL.url_count_by_register, function (req, res) {
    let result = require("../json/regOverViewData.json");
    res.json({
      code: URL.API_SUCCESS,
      msg: "成功",
      data: result
    })
  });
}
