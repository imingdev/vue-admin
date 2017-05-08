/**
 * Created by zzmhot on 2017/3/24.
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/24 16:45
 * @Copyright(©) 2017 by zzmhot.
 *
 */

var mock = require('../mock/table')
var uri = require('../../src/common/port_uri').port_table

module.exports = function (apiRouter) {
  //获取数据列表
  apiRouter.get(uri.list, function (req, res) {
    mock.list.data.page = parseInt(req.query.page)
    setTimeout(function () {
      res.json(mock.list)
    }, 1000)
  })
  //根据id查询数据
  apiRouter.get(uri.get, function (req, res) {
    mock.get.data.id = parseInt(req.query.id)
    setTimeout(function () {
      res.json(mock.get)
    }, 1000)
  })
  //根据id删除数据
  apiRouter.post(uri.del, function (req, res) {
    setTimeout(function () {
      res.json(mock.del)
    }, 1000)
  })
  //添加或修改数据
  apiRouter.post(uri.save, function (req, res) {
    setTimeout(function () {
      res.json(mock.save)
    }, 1000)
  })
  apiRouter.post(uri.batch_del, function (req, res) {
    setTimeout(function () {
      res.json(mock.batch_del)
    }, 1000)
  })
}
