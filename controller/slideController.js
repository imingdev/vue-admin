/**
 * Created by admin on 2016/12/5.
 */
const URL = require('../src/common/URL')

module.exports = function (apiRouter) {
  //幻灯片管理
  apiRouter.get(URL.url_slide_manage, function (req, res) {
    let result = require("../json/slideData.json");
    res.json({
      code: URL.API_SUCCESS,
      msg: "成功",
      data: result,
      p: "1",
      total: "20"
    })
  });
  //根据id查询幻灯片
  apiRouter.get(URL.url_slide_by_id, function (req, res) {
    let result = require("../json/slide_by_id_Data.json");
    res.json({
      code: URL.API_SUCCESS,
      msg: "成功",
      data: result
    })
  });
  //修改提交
  apiRouter.post(URL.url_slide_update, function (req, res) {
    res.json({
      code: URL.API_SUCCESS,
      msg: "修改成功！"
    })
  });
  //添加提交
  apiRouter.post(URL.url_slide_add, function (req, res) {
    res.json({
      code: URL.API_SUCCESS,
      msg: "添加成功！"
    })
  });
  //设置幻灯片显示/隐藏
  apiRouter.post(URL.url_slide_is_show, function (req, res) {
    res.json({
      code: URL.API_SUCCESS,
      msg: "修改成功！"
    })
  });
  //幻灯片删除
  apiRouter.post(URL.url_slide_delete, function (req, res) {
    res.json({
      code: URL.API_SUCCESS,
      msg: "删除成功！"
    })
  });
}
