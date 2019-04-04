/**
 * 将对象解析成key=value&key2=value2模式.
 * @param obj 对象
 * @returns {string}
 */
export default obj => {
  obj = obj || {}
  let _result = ''
  for (let key in obj) {
    let value = obj[key]
    if (typeof value !== 'undefined' && value !== null && value !== '') {
      // 有时候数值型0会转成false
      if (_result) {
        _result += '&'
      }
      _result += `${key}=${value}`
    }
  }
  return _result
}
