/**
 * @file: index.
 * @intro: storage存储.
 * @author: zzmhot.
 * @email: zzmhot@163.com.
 * @Date: 2017/4/28 10:42.
 * @Copyright(©) 2017 by zzmhot.
 *
 */

//存储前缀
import {storagePrefix} from './setting'

import {localStorage, sessionStorage} from './storage'
import cookieStorage from './cookie'

export {
  localStorage,
  sessionStorage,
  cookieStorage,
  storagePrefix
}
