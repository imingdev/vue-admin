/**
 * Created by admin on 2016/12/19.
 */
const URL = require('../src/common/URL')

module.exports = function (apiRouter) {
  //获取课程列表
  apiRouter.get(URL.url_course_manage, function (req, res) {
    let result = require("../json/courseData.json");
    res.json({
      code: URL.API_SUCCESS,
      msg: "成功",
      data: result,
      p: "1",
      total: "20"
    })
  });
  //根据id查询
  apiRouter.get(URL.url_course_by_id, function (req, res) {
    let result = require("../json/courseData.json");
    res.json({
      code: URL.API_SUCCESS,
      msg: "成功",
      data: result[0]
    })
  });
  //课程删除
  apiRouter.post(URL.url_course_delete, function (req, res) {
    res.json({
      code: URL.API_SUCCESS,
      msg: "删除成功！"
    })
  });
  //课程修改提交
  apiRouter.post(URL.url_course_update, function (req, res) {
    res.json({
      code: URL.API_SUCCESS,
      msg: "修改成功！"
    })
  });
  //课程消息管理
  apiRouter.get(URL.url_course_message_manage, function (req, res) {
    let result = require("../json/courseMessageData.json");
    res.json({
      code: URL.API_SUCCESS,
      msg: "成功",
      data: result,
      p: "1",
      total: "20"
    })
  });
  //根据id查询课程消息
  apiRouter.get(URL.url_course_message_manage, function (req, res) {
    let result = require("../json/courseMessageData.json");
    res.json({
      code: URL.API_SUCCESS,
      msg: "成功",
      data: result[0]
    })
  });
  //课程消息显示隐藏
  apiRouter.post(URL.url_course_message_isshow, function (req, res) {
    res.json({
      code: URL.API_SUCCESS,
      msg: "成功"
    })
  });
  //获取课程中的会员信息
  apiRouter.get(URL.url_get_lecture_members, function (req, res) {
    let result = require("../json/courseMembersData.json");
    res.json({
      code: URL.API_SUCCESS,
      msg: "成功",
      data: result
    })
  });
  // 上传课程消息
  apiRouter.post(URL.url_course_uploda_msg, function (req, res) {
    res.json({
      code: URL.API_SUCCESS,
      msg: "成功"
    })
  });
}
