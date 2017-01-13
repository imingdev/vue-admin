/**
 * Created by zzmhot on 2017/1/13.
 * Vue插件安装
 */
////////////////////////////////////////////////////////////////////
//                          _ooOoo_                               //
//                         o8888888o                              //
//                         88" . "88                              //
//                         (| ^_^ |)                              //
//                         O\  =  /O                              //
//                      ____/`---'\____                           //
//                    .'  \\|     |//  `.                         //
//                   /  \\|||  :  |||//  \                        //
//                  /  _||||| -:- |||||-  \                       //
//                  |   | \\\  -  /// |   |                       //
//                  | \_|  ''\---/''  |   |                       //
//                  \  .-\__  `-`  ___/-. /                       //
//                ___`. .'  /--.--\  `. . ___                     //
//              ."" '<  `.___\_<|>_/___.'  >'"".                  //
//            | | :  `- \`.;`\ _ /`;.`/ - ` : | |                 //
//            \  \ `-.   \_ __\ /__ _/   .-` /  /                 //
//      ========`-.____`-.___\_____/___.-`____.-'========         //
//                           `=---='                              //
//      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^       //
//       佛祖保佑            永无BUG              永不修改            //
////////////////////////////////////////////////////////////////////
/*
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/1/13 14:15
 * @Copyright(©) 2017 by zzmhot.
 *
 */
import ViewImage from 'plugins/ViewImage'
import DateFormat from 'plugins/date'

const install = function (Vue) {
  if (install.installed) return
  Vue.$ViewImage = Vue.prototype.$ViewImage = ViewImage
  Date.$DateFormat = Date.prototype.$DateFormat = DateFormat
}

module.exports = {
  install
}
