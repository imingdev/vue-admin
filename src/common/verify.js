/**
 * @intro: 常用验证工具类.
 *
 */
/**
 * //验证url是否正确
 * @param url
 * @returns {boolean}
 */
// eslint-disable-next-line
export const isUrl = url => (/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/i).test(url)
/**
 * 验证手机号码是否正确
 * @param tel
 * @returns {boolean}
 */
export const isTel = tel => (/^1[3|4|5|8][0-9]\d{4,8}$/).test(tel)

/**
 * 判断是否是object对象
 * @param obj
 * @returns {boolean}
 */
export const isObject = obj => !!obj && Object.prototype.toString.call(obj) === '[object Object]'
/**
 * 判断是否是数组
 * @param array
 * @returns {boolean}
 */
export const isArray = array => !!array && Object.prototype.toString.call(array) === '[object Array]'
