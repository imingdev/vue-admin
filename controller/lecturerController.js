/**
 * Created by admin on 2016/12/23.
 */
const URL = require('../src/common/URL')

module.exports = function (apiRouter) {
  //获取讲师认证列表
  apiRouter.get(URL.url_get_lecturer_verify, function (req, res) {
    let result = require('../json/lecturerVerifyData.json')
    res.json({
      code: URL.API_SUCCESS,
      msg: "成功",
      data: result,
      p: "1",
      total: "20"
    })
  });
  //设置讲师认证状态
  apiRouter.post(URL.url_set_lecturer_verify_status, function (req, res) {
    res.json({
      code: URL.API_SUCCESS,
      msg: "操作成功"
    })
  });
}
