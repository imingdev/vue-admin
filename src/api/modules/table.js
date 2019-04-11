import fetch from 'src/fetch'
import * as tableUrl from '../constant/table'

// 数据列表
export const list = params => {
  return fetch({
    url: tableUrl.list,
    params
  })
}

// 根据id查询数据
export const get = (params) => {
  return fetch({
    url: tableUrl.get,
    params
  })
}

// 根据id删除数据
export const del = (data) => {
  return fetch({
    url: tableUrl.del,
    method: 'delete',
    data
  })
}
// 添加或修改数据
export const save = (data) => {
  return fetch({
    url: tableUrl.save,
    method: 'post',
    data
  })
}
// 批量删除
export const batchDel = (data) => {
  return fetch({
    url: tableUrl.batchDel,
    method: 'delete',
    data
  })
}
