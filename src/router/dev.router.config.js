/**
 * Created by zzmhot on 2017/1/13.
 * 开发版路由配置
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
module.exports = [{
  path: '/slide',
  name: 'slide',
  component: require('pages/slide/table'),
  meta: {
    authVerify: true
  }
}, {
  path: '/slide/add',
  name: 'slideAdd',
  component: require('pages/slide/add'),
  meta: {
    authVerify: true
  }
}, {
  path: '/slide/update/:id',
  name: 'slideUpdate',
  component: require('pages/slide/update'),
  meta: {
    authVerify: true
  }
}, {
  path: '/menu',
  name: 'menu',
  component: require('pages/menu'),
  meta: {
    authVerify: true
  }
}, {
  path: '/media',
  name: 'media',
  component: require('pages/media/table'),
  meta: {
    authVerify: true
  }
}, {
  path: '/course',
  name: 'course',
  component: require('pages/course/table'),
  meta: {
    authVerify: true
  }
}, {
  path: '/course/update/:id',
  name: 'courseUpdate',
  component: require('pages/course/update'),
  meta: {
    authVerify: true
  }
}, {
  path: '/course/message/:id',
  name: 'courseMessage',
  component: require('pages/course/message/table'),
  meta: {
    authVerify: true
  }
// }, {
//   path: '/course/message/:id/add',
//   name: 'courseMessageAdd',
//   component: require('pages/course/message/add'),
//   meta: {
//     authVerify: true
//   }
}, {
  path: '/media/update/:id',
  name: 'mediaUpdate',
  component: require('pages/media/update'),
  meta: {
    authVerify: true
  }
}, {
  path: '/media/add',
  name: 'mediaAdd',
  component: require('pages/media/add'),
  meta: {
    authVerify: true
  }
}, {
  path: '/user/login',
  name: 'login',
  components: {
    fullView: require('pages/user/login')
  }
}, {
  path: '/lecturer/verify',
  name: 'lecturerVerify',
  component: require('pages/lecturer/verify/table'),
  meta: {
    authVerify: true
  }
}, {
  path: '/insurance/headline',
  name: 'insuranceHeadline',
  component: require('pages/insurance/headline/table'),
  meta: {
    authVerify: true
  }
}, {
  path: '/insurance/headline/add',
  name: 'insuranceHeadlineAdd',
  component: require('pages/insurance/headline/add'),
  meta: {
    authVerify: true
  }
}, {
  path: '/insurance/headline/update/:id',
  name: 'insuranceHeadlineUpdate',
  component: require('pages/insurance/headline/update'),
  meta: {
    authVerify: true
  }
}, {
  path: '/insurance/investment/department',
  name: 'insuranceDepartment',
  component: require('pages/insurance/investment/department/table'),
  meta: {
    authVerify: true
  }
}, {
  path: '/insurance/investment/department/add',
  name: 'insuranceDepartmentAdd',
  component: require('pages/insurance/investment/department/add'),
  meta: {
    authVerify: true
  }
}, {
  path: '/insurance/investment/department/update/:id',
  name: 'insuranceDepartmentUpdate',
  component: require('pages/insurance/investment/department/update'),
  meta: {
    authVerify: true
  }
}, {
  path: '/insurance/investment/department/invest/:id',
  name: 'insuranceDepartmentInvest',
  component: require('pages/insurance/investment/department/invest/table'),
  meta: {
    authVerify: true
  }
}, {
  path: '/insurance/investment/department/invest/update:id',
  name: 'insuranceDepartmentInvestUpdate',
  component: require('pages/insurance/investment/department/invest/update'),
  meta: {
    authVerify: true
  }
}, {
  path: '',
  redirect: '/course'
}, {
  path: '*',
  name: 'notPage',
  components: {
    fullView: require('pages/error/404')
  }
}]
