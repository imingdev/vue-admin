/**
 * @intro: api集合，将扫描modules下面的所有接口，并且根据路径生成驼峰命名为key.
 */
let _result = {}
// 驼峰命名转换
const camelCaseChange = (str, separator = '/') => str.replace(new RegExp(`${separator}(\\w)`, 'g'), str => str.slice(1).toUpperCase())
const context = require.context('./modules', true, /\.js$/)
context.keys().map(item => {
  const k = camelCaseChange(item.match(/\.\/(\S*)\.js$/)[1])
  _result[k] = context(item)
})

export default _result
