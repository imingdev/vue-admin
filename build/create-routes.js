/**
 * @intro: 路由生成.
 *
 */
const glob = require('glob')
const watch = require('watch')
const {readFileSync, writeFileSync} = require('fs')
const cheerio = require('cheerio')
const path = require('path')
const beautifyJs = require('js-beautify').js
//驼峰命名转换
const camelCaseChange = (str, separator = '/') => str.replace(new RegExp(`${separator}(\\w)`, 'g'), str => str.slice(1).toUpperCase())
const resolve = (...dir) => path.join(__dirname, '..', ...dir)
//获取src目录
const srcDir = resolve('src')

//创建对象
const createRoutesObject = () => {
  const pages = glob.sync(`${srcDir}/pages/**/index.vue`) || []

  //路由对象
  let routesObject = {}

  pages.forEach((path) => {
    const pageFile = readFileSync(path, 'utf-8')
    // 获取路径
    const routePath = path.match(/src\/pages(\S*)\/index.vue/)[1]
    //获取名字
    const routeName = camelCaseChange(camelCaseChange(routePath), '_')
    //获取标签dom
    const scriptDom = cheerio('script', pageFile, null, {xml: {normalizeWhitespace: true,}})[0] || {}
    //这里获取所有属性的key都会转换成小写
    const scriptAttrs = scriptDom.attribs || {}
    //是否是动态路由
    const isDynamicRoute = scriptAttrs.dynamicRoute !== undefined

    //布局
    const _layout = scriptAttrs.layout || 'default'
    const _layoutName = camelCaseChange(`/${_layout}/layout`)
    let _layoutItem = routesObject[_layout]

    if (!_layoutItem) {
      _layoutItem = {
        componentName: `${_layoutName}Component`,
        layoutName: _layoutName,
        layoutFilePath: `src/layout/${_layout}`,
        children: {}
      }
    }
    if (!_layoutItem.isDynamicRoute && isDynamicRoute) {
      _layoutItem.isDynamicRoute = true
    }
    _layoutItem.children[routeName] = {
      routeName,
      routePath: routePath.replace(/\/_/g, '/:'),
      routeFilePath: `src/pages${routePath}`,
      componentName: `${routeName}PageComponent`,
      attrs: scriptAttrs || {},
      isDynamicRoute
    }
    routesObject[_layout] = _layoutItem
  })

  const {importArr, routeArr, dynamicRoute} = createRoutesArray(routesObject)
  let dynamicRouteStr = ''
  for (let key in dynamicRoute) {
    const {name, path, component, meta} = dynamicRoute[key]
    const _meta = meta ? `meta: ${meta}` : ''
    dynamicRouteStr += `export const ${key} = {
      name: ${name},
      path: '${path}',
      component: ${component},
      ${_meta}
    }\n`
  }
  const output = `/* eslint-disable */${importArr.join('')}${dynamicRouteStr}export default [${routeArr.join('')}]`
  writeFileSync(`${srcDir}/router/auto-routes.js`, beautifyJs(output, {indent_size: 2}), {encoding: 'utf8'})
}

const createRoutesArray = (routesObject, isLayout = true) => {
  let _importArr = []
  let _routeArr = []
  let _dynamicRouteObj = {}

  let _index = 0
  for (let key in routesObject) {
    const {
      layoutName,
      layoutFilePath,
      children,
      componentName,
      isDynamicRoute,
      routeName,
      routePath,
      routeFilePath,
      attrs
    } = routesObject[key] || {}
    const {meta, require, webpackChunkName = `Page${routeName}`} = attrs || {}

    if (isLayout) {
      _importArr.push(`import ${componentName} from '${layoutFilePath}'`)
      _dynamicRouteObj[layoutName] = {
        name: `${componentName}.name`,
        path: '/',
        component: componentName
      }
    } else {
      const isLazy = require === 'lazy'
      let _name
      if (isLazy) {
        _importArr.push(`const ${componentName} = () => import(/* webpackChunkName: "${webpackChunkName}" */ '${routeFilePath}')`)
        _name = `'${routeName}'`
      } else {
        _importArr.push(`import ${componentName} from '${routeFilePath}'`)
        _name = `${componentName}.name`
      }
      _dynamicRouteObj[routeName] = {
        name: _name,
        path: `${routePath}`,
        component: componentName,
        meta
      }
      if (!isDynamicRoute) {
        _routeArr[_index] = routeName
        _index++
      }
    }

    if (children && JSON.stringify(children) !== '{}') {
      const {importArr, routeArr, dynamicRoute} = createRoutesArray(children, false)
      _importArr = _importArr.concat(importArr)
      _dynamicRouteObj = {..._dynamicRouteObj, ...dynamicRoute}

      if (routeArr.length) {
        _routeArr[_index] = `${_index ? ',' : ''}{
          name: ${layoutName}.name,
          path: ${layoutName}.path,
          component: ${layoutName}.component,
          children: [${routeArr}]
        }`
        _index++
      }
    }
  }
  return {importArr: _importArr, routeArr: _routeArr, dynamicRoute: _dynamicRouteObj}
}

module.exports = () => {
  const env = process.env.NODE_ENV || 'development'
  createRoutesObject()
  if (env !== 'development') return false

  watch.createMonitor(`${srcDir}/pages`, monitor => {
    monitor.files[`${srcDir}/pages/index.vue`]
    monitor.on('created', createRoutesObject)
    monitor.on('changed', createRoutesObject)
    monitor.on('removed', createRoutesObject)
  })
}
