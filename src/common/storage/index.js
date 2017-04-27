/**
 * @file: index.
 * @intro: Storage工具类.
 * @author: zzmhot.
 * @email: zzmhot@163.com.
 * @Date: 2017/4/27 15:28.
 * @Copyright(©) 2017 by thinkive.
 *
 */

//本地存储的前缀
const storagePrefix = 'zzm_admin_'

class Storage {

  constructor(type) {
    if (type === 'local') {
      this.store = window.localStorage
    } else if (type === 'session') {
      this.store = window.sessionStorage
    }
  }

  set(key, value, fn) {
    try {
      value = JSON.stringify(value)
    } catch (e) {
      value = value
    }

    this.store.setItem(storagePrefix + key, value)

    fn && fn()
  }

  get(key, fn) {
    if (!key) {
      throw new Error('没有找到key。')
      return
    }
    if (typeof key === 'object') {
      throw new Error('key不能是一个对象。')
      return
    }
    let value = this.store.getItem(storagePrefix + key)
    if (value !== null) {
      try {
        value = JSON.parse(value)
      } catch (e) {
        value = value
      }
    }
    return value
  }

  remove(key) {
    this.store.removeItem(storagePrefix + key)
  }
}

export const localStorage = new Storage('local')
export const sessionStorage = new Storage('session')
