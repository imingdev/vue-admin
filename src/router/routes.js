/**
 * @intro: 路由.
 *
 */
import routes, {Error, Home} from './auto-routes'

export default [{
  path: '*',
  redirect: Error.path
}, {
  path: '/',
  redirect: Home.path
}].concat(routes)
