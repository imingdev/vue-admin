import Pagination from 'element-ui/lib/pagination'

/**
 * 重写element-ui的组件,在原有的基础上新增两个prop，top和align
 * @param {String} top   距离顶部的距离
 * @param {String} align   对齐方式
 */
export default {
  ...Pagination,
  name: 'UiPagination',
  props: {
    ...Pagination.props || {},
    top: {
      type: String,
      default: '20px'
    },
    align: {
      type: String,
      default: 'right',
      validator: align => ['left', 'center', 'right'].indexOf(align) !== -1
    }
  },
  render (createdElement) {
    const {top, align} = this
    const template = Pagination.render.call(this, createdElement)
    return createdElement('div', {style: {marginTop: top, textAlign: align}}, [template])
  }
}
