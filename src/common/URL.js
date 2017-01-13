/**
 * Created by zzmhot on 2017/1/13.
 *
 * 接口地址
 *
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
//正确码
const API_SUCCESS = 0
//错误码
const API_ERROR = 1
//未登录
const API_UNLOGIN = 2

const baseUrl = "/admin/api"

//登录
const url_user_login = "/index.php/Admin/Login/login"
//登出
const url_user_logout = "/index.php/Admin/Login/logout"
//获取用户信息
const url_user_info = "/index.php/Admin/Login/getuserinfo"
//幻灯片管理
const url_slide_manage = "/index.php/Admin/Banner/list_"
//文件上传
const url_file_upload = "/index.php/Admin/Tools/fileupload"
//根据id查询幻灯片
const url_slide_by_id = "/index.php/Admin/Banner/get"
//幻灯片修改提交
const url_slide_update = "/index.php/Admin/Banner/save"
//幻灯片添加提交
const url_slide_add = "/index.php/Admin/Banner/save"
//设置幻灯片显示/隐藏
const url_slide_is_show = baseUrl + "/post/slide/updeta_show"
//幻灯片删除
const url_slide_delete = "/index.php/Admin/Banner/del"
//注册统计（昨天和今天）
const url_count_by_register = baseUrl + "/get/over_view/reg"
//统计概况
const url_count_over_view = baseUrl + "/get/over_view"
//获取自定义菜单
const url_menu_info = baseUrl + "/get/menu/info"
//提交自定义菜单
const url_menu_save = baseUrl + "/post/menu/save"
//获取图文消息素材
const url_media_message = "/index.php/Admin/Material/imgtextmsg_list"
//根据id获取图文消息素材
const url_media_message_by_id = "/index.php/Admin/Material/imgtextmsg_get"
//添加图文消息
const url_add_media_message = "/index.php/Admin/Material/imgtextmsg_save"
//修改图文消息
const url_update_media_message = "/index.php/Admin/Material/imgtextmsg_save"
//删除图文消息中的子项
const url_delete_media_message_sub_by_id = "/index.php/Admin/Material/material_del"
//根据id获取图文消息预览二维码
const url_media_message_sub_code_by_id = baseUrl + "/get/media/message/qrcode"
//获取图片素材
const url_media_photo = baseUrl + "/get/media/photo"
//删除图文消息素材
const url_media_message_delete = "/index.php/Admin/Material/imgtextmsg_del"
//删除图片素材
const url_media_photo_delete = baseUrl + "/post/media/photo/delete"
//获取课程列表
const url_course_manage = "/index.php/Admin/Lectures/list_"
//删除课程
const url_course_delete = "/index.php/Admin/Lectures/del"
//根据id查询课程
const url_course_by_id = "/index.php/Admin/Lectures/get"
//课程修改提交
const url_course_update = "/index.php/Admin/Lectures/save"
//课程消息管理
const url_course_message_manage = "/index.php/Admin/Lectures/get_msg"
//课程消息显示隐藏
const url_course_message_isshow = "/index.php/Admin/Lectures/del_msg"
//获取课程中的会员信息
const url_get_lecture_members = "/index.php/Admin/Lectures/get_lecture_members"
//上传课程消息
const url_course_uploda_msg = "/index.php/Admin/Lectures/uploda_msg"
//获取讲师认证
const url_get_lecturer_verify = "/index.php/Admin/PersonalCenter/verify_list"
//设置讲师认证状态
const url_set_lecturer_verify_status = "/index.php/Admin/PersonalCenter/verify_status"
//保险头条
const url_get_insurance_headline = "/index.php/Admin/FrontPage/list_frontpage"
//根据id获取保险头条
const url_get_insurance_headline_by_id = "/index.php/Admin/FrontPage/get_frontpage"
//删除保险头条
const url_delete_insurance_headline = "/index.php/Admin/FrontPage/del_frontpage"
//添加保险头条
const url_add_insurance_headline = "/index.php/Admin/FrontPage/add_frontpage"
//修改保险头条
const url_update_insurance_headline = "/index.php/Admin/FrontPage/add_frontpage"
//保险投资部门管理
const url_get_insurance_department = "/index.php/Admin/Invest/department_list"
//保险投资添加部门
const url_add_insurance_department = "/index.php/Admin/Invest/department_save"
//保险投资修改部门
const url_update_insurance_department = "/index.php/Admin/Invest/department_save"
//根据id获取保险投资某个部门
const url_get_insurance_department_by_id = "/index.php/Admin/Invest/department_get"
//根据id删除保险投资某个部门
const url_delete_insurance_department_by_id = "/index.php/Admin/Invest/department_del"
//根据部门id查询部门的投资详情
const url_get_insurance_department_invest = "/index.php/Admin/Invest/invest_list"
//根据投资详情id查询投资详情
const url_get_insurance_department_invest_by_id = "/index.php/Admin/Invest/invest_get"
//修改投资详情
const url_update_insurance_department_invest = "/index.php/Admin/Invest/invest_save"

exports = module.exports = {
  API_SUCCESS,
  API_ERROR,
  API_UNLOGIN,

  url_user_login,
  url_user_logout,
  url_user_info,
  url_slide_manage,
  url_file_upload,
  url_slide_update,
  url_slide_add,
  url_slide_is_show,
  url_slide_delete,
  url_slide_by_id,
  url_count_by_register,
  url_count_over_view,
  url_menu_info,
  url_menu_save,
  url_media_message,
  url_media_photo,
  url_media_message_delete,
  url_media_photo_delete,
  url_course_manage,
  url_course_delete,
  url_course_by_id,
  url_course_update,
  url_course_message_manage,
  url_course_message_isshow,
  url_get_lecture_members,
  url_course_uploda_msg,
  url_get_lecturer_verify,
  url_set_lecturer_verify_status,
  url_add_media_message,
  url_media_message_by_id,
  url_update_media_message,
  url_delete_media_message_sub_by_id,
  url_media_message_sub_code_by_id,
  url_get_insurance_headline,
  url_delete_insurance_headline,
  url_get_insurance_headline_by_id,
  url_add_insurance_headline,
  url_update_insurance_headline,
  url_get_insurance_department,
  url_add_insurance_department,
  url_update_insurance_department,
  url_get_insurance_department_by_id,
  url_delete_insurance_department_by_id,
  url_get_insurance_department_invest,
  url_get_insurance_department_invest_by_id,
  url_update_insurance_department_invest
}
