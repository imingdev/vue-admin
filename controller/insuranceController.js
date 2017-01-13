/**
 * Created by admin on 2017/1/4.
 */
const URL = require('../src/common/URL')

module.exports = function (apiRouter) {
  //保险头条
  apiRouter.get(URL.url_get_insurance_headline, function (req, res) {
    let result = require("../json/insuranceHealineData.json")
    res.json({
      code: URL.API_SUCCESS,
      msg: '成功',
      data: result,
      p: "1",
      total: "20"
    })
  });
  //根据id删除保险头条
  apiRouter.post(URL.url_delete_insurance_headline, function (req, res) {
    res.json({
      code: URL.API_SUCCESS,
      msg: '删除成功'
    })
  });
  //根据id获取保险头条
  apiRouter.get(URL.url_get_insurance_headline_by_id, function (req, res) {
    let result = require("../json/insuranceHealineData.json")
    res.json({
      code: URL.API_SUCCESS,
      msg: '成功',
      data: result[0]
    })
  });
  //添加保险头条
  apiRouter.post(URL.url_add_insurance_headline, function (req, res) {
    res.json({
      code: URL.API_SUCCESS,
      msg: '添加成功'
    })
  });
  //修改保险头条
  apiRouter.post(URL.url_update_insurance_headline, function (req, res) {
    res.json({
      code: URL.API_SUCCESS,
      msg: '修改成功'
    })
  });
  //保险投资部门管理
  apiRouter.get(URL.url_get_insurance_department, function (req, res) {
    let result = require("../json/insuranceDepartmentData.json")
    res.json({
      code: URL.API_SUCCESS,
      msg: '成功',
      data: result
    })
  });
  //保险投资添加部门
  apiRouter.post(URL.url_add_insurance_department, function (req, res) {
    res.json({
      code: URL.API_SUCCESS,
      msg: '添加成功'
    })
  })
  //保险投资修改部门
  apiRouter.post(URL.url_update_insurance_department, function (req, res) {
    res.json({
      code: URL.API_SUCCESS,
      msg: '修改成功'
    })
  });
  //根据id获取保险投资某个部门
  apiRouter.get(URL.url_get_insurance_department_by_id, function (req, res) {
    let result = require("../json/insuranceDepartmentData.json")
    res.json({
      code: URL.API_SUCCESS,
      msg: '成功',
      data: result[0]
    })
  });
  //根据id删除保险投资某个部门
  apiRouter.post(URL.url_delete_insurance_department_by_id, function (req, res) {
    res.json({
      code: URL.API_SUCCESS,
      msg: '删除成功'
    })
  });
  //根据部门id查询部门的投资详情
  apiRouter.get(URL.url_get_insurance_department_invest, function (req, res) {
    let result = require("../json/insuranceInvestmentData.json")
    res.json({
      code: URL.API_SUCCESS,
      msg: '成功',
      data: result
    })
  });
  //根据投资详情id查询投资详情
  apiRouter.get(URL.url_get_insurance_department_invest_by_id, function (req, res) {
    let result = require("../json/insuranceInvestmentData.json")
    res.json({
      code: URL.API_SUCCESS,
      msg: '成功',
      data: result[0]
    })
  });
  //修改投资详情
  apiRouter.post(URL.url_update_insurance_department_invest, function (req, res) {
    res.json({
      code: URL.API_SUCCESS,
      msg: '修改成功'
    })
  });
}
