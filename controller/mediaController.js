/**
 * Created by admin on 2016/12/14.
 */
const URL = require('../src/common/URL')

module.exports = function (apiRouter) {
  //获取图文消息素材
  apiRouter.get(URL.url_media_message, function (req, res) {
    let result = require("../json/mediaData.json");
    res.json({
      code: URL.API_SUCCESS,
      msg: "成功",
      data: result.message,
      p: "1",
      total: "20"
    })
  });
  //根据id获取图文消息素材
  apiRouter.get(URL.url_media_message_by_id, function (req, res) {
    let result = require("../json/mediaData.json");
    res.json({
      code: URL.API_SUCCESS,
      msg: "成功",
      data: result.message[0]
    })
  })
  //删除图文消息素材
  apiRouter.post(URL.url_media_message_delete, function (req, res) {
    res.json({
      code: URL.API_SUCCESS,
      msg: "删除成功"
    })
  });
  //添加图文消息素材
  apiRouter.post(URL.url_add_media_message, function (req, res) {
    res.json({
      code: URL.API_SUCCESS,
      msg: "添加成功"
    })
  })
  //修改图文消息
  apiRouter.post(URL.url_update_media_message, function (req, res) {
    res.json({
      code: URL.API_SUCCESS,
      msg: "修改成功"
    })
  })
  //删除图文消息中的子项
  apiRouter.post(URL.url_delete_media_message_sub_by_id, function (req, res) {
    res.json({
      code: URL.API_SUCCESS,
      msg: "删除成功"
    })
  })
  //删除图片素材
  apiRouter.post(URL.url_media_photo_delete, function (req, res) {
    res.json({
      code: URL.API_SUCCESS,
      msg: "删除成功"
    })
  });
  //获取图片素材
  apiRouter.get(URL.url_media_photo, function (req, res) {
    let result = require("../json/mediaData.json");
    res.json({
      code: URL.API_SUCCESS,
      msg: "成功",
      data: result.photo,
      p: "1",
      total: "20"
    })
  });
  // 根据id获取图文消息预览二维码
  apiRouter.get(URL.url_media_message_sub_code_by_id, function (req, res) {
    let result = require("../json/mediaMessageQRCode.json");
    res.json({
      code: URL.API_SUCCESS,
      msg: "成功",
      data: result
    })
  });
}
