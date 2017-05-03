/**
 * Created by zzmhot on 2017/3/29.
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/29 13:20
 * @Copyright(©) 2017 by zzmhot.
 *
 */

//验证url是否正确，true/false
export function url(url) {
  return (/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/i).test(url)
}
//验证手机号码是否正确， true/false
export function tel(tel) {
  return (/^1[3|4|5|8][0-9]\d{4,8}$/).test(tel)
}

//URI 解码
export function decode(value) {
  return decodeURIComponent(value);
}
//URI 编码
export function encode(value) {
  return encodeURIComponent(value)
}
//判断是否是object对象
export function isObject(value) {
  return !!value && Object.prototype.toString.call(value) === '[object Object]';
}
//判断是否是数组
export function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
}
