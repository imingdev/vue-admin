/**
 * Created by zzmhot on 2017/1/13.
 * 图片查看器
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
import Vue from 'vue'
const ViewImage = Vue.extend(require('./ViewImage.vue'))
let instance

const open = (options, index) => {
  options = options || []
  if (typeof options === 'string') {
    options = [options]
  }
  if (index) {
    if (index < 0) {
      index = 0
    }
    if (index > options.length - 1) {
      index = options.length - 1
    }
  } else {
    index = 0
  }
  if (!instance) {
    instance = new ViewImage({
      el: document.createElement('div')
    })
  }
  if (instance.visible) return
  document.body.appendChild(instance.$el)
  Vue.nextTick(() => {
    instance.visible = true;
    instance.imageData = options
    instance.imgIndex = index
    instance.$el.style.display = 'block'
    document.body.style.overflow = 'hidden'
  })

}

const close = () => {
  if (instance) {
    setTimeout(() => {
      if (instance.$el) {
        instance.visible = false;
        instance.imgIndex = 0
        instance.$el.style.display = 'none';
        document.body.style.overflow = null
      }
    }, 200);
  }
}

module.exports = {
  open,
  close
}
