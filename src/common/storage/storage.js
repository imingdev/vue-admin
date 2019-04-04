/**
 * @intro: Storage工具类.
 *
 */

// 存储前缀
import {storagePrefix} from 'src/common/setting'

class Storage {
  constructor (type) {
    if (type === 'local') {
      this.store = window.localStorage
    } else if (type === 'session') {
      this.store = window.sessionStorage
    }
    this.prefix = storagePrefix
  }

  set (key, value) {
    try {
      value = JSON.stringify(value)
      this.store.setItem(this.prefix + key, value)
    } catch (e) {
      // eslint-disable-next-line
    }

    return this
  }

  get (key) {
    if (!key) {
      throw new Error('没有找到key。')
    }
    if (typeof key === 'object') {
      throw new Error('key不能是一个对象。')
    }
    let value = this.store.getItem(this.prefix + key)

    if (value === null) {
      return {}
    }

    try {
      value = JSON.parse(value)
    } catch (e) {
      value = {}
    }
    return value
  }

  remove (key) {
    this.store.removeItem(this.prefix + key)
    return this
  }
}

export const localStorage = new Storage('local')
export const sessionStorage = new Storage('session')
