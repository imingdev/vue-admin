/**
 * Created by admin on 2016/12/9.
 */
const URL = require('../src/common/URL')

module.exports = function (apiRouter) {
  //文件上传
  apiRouter.post(URL.url_file_upload, function (req, res) {
    let image = require("../json/imageUploadData.json");
    res.json({
      code: URL.API_SUCCESS,
      msg: "成功",
      data: image
    })
  })
}
