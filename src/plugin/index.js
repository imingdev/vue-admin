/**
 * @intro: 插件.
 */
import * as verify from 'src/common/verify'
import api from 'src/api'

const install = Vue => {
  if (install.installed) return false

  // 添加到Vue的原型链上
  Object.defineProperties(Vue.prototype, {
    $valid: {value: verify},
    $api: {value: api}
  })

  install.installed = true
}

export default install
