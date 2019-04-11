import fetch from 'src/fetch'
import * as fileUrl from '../constant/file'

// 图片上传
export const imageUpload = data => {
  return fetch({
    url: fileUrl.imageUpload,
    method: 'post',
    data
  })
}
