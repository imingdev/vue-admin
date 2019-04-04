/**
 * @intro: 路由.
 *
 */
import routes, {Error} from './auto-routes'

export default [{
  path: '*',
  redirect: Error.path
}, {
  path: '/',
  redirect: Error.path
}].concat(routes)
