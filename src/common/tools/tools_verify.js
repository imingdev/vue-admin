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
