/**
 * @file: index.
 * @intro: 封装http通用请求.
 * @author: zzmhot.
 * @email: zzmhot@163.com.
 * @Date: 2017/4/27 10:32.
 * @Copyright(©) 2017 by zzmhot.
 *
 */

//导入模块
import Vue from 'vue'
import axios from 'axios'
import {port_code} from 'common/port_uri'
import router from 'src/router'
import store from 'store'
import {SET_USER_INFO} from 'store/actions/type'

//设置默认根地址
axios.defaults.baseURL = '/'
//设置请求超时设置
axios.defaults.timeout = 2000

//设置用户信息action
const setUserInfo = function (user) {
  store.dispatch(SET_USER_INFO, user)
}

/**
 * 封装axios的通用请求
 * 请求的数据格式定义为
 * {code: 0,msg: 'msg', data:object/array}
 * @param {string} type 请求类型，如：get、post
 * @param {string} url 请求地址
 * @param {object} params 请求参数，没有的话直接不传
 * @param {Function} successFn 成功回调
 * @param {Function} errorFn  错误回调
 */
const axiosRequest = function (type, url, params) {
  return axios[type](url, params)
    .then((response) => {
      let resData = response.data
      let dataCode = resData.code
      let datamsg = resData.msg
      if (dataCode === port_code.success) {
        return Promise.resolve(response)
      } else if (dataCode === port_code.unlogin) {
        setUserInfo(null)
        router.replace({name: "login"})
      }
      Vue.prototype.$message({
        message: datamsg,
        type: 'warning'
      })
      return Promise.reject({code: dataCode, msg: datamsg})
    })
    .catch((error) => {
      if (error.response) {
        let resError = error.response
        let resCode = resError.status
        let resMsg = error.message
        Vue.prototype.$message({
          message: '操作失败！错误原因 ' + resMsg,
          type: 'error'
        })
        return Promise.reject({code: resCode, msg: resMsg})
      }
    })
}

export default {
  /**
   * 发起一个GET请求
   * @param {string} url 请求地址
   * @param {object} params 请求参数 如 {id: 1}
   */
  get(url, params){
    return axiosRequest('get', url, {params})
  },
  /**
   * 发起一个POST请求
   * @param {string} url 请求地址
   * @param {object} params 请求参数 如 {id: 1}
   */
  post(url, params){
    return axiosRequest('post', url, params)
  }
}
