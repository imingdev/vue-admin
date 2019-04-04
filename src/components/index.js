import container from './container'
import pagination from './pagination'

const components = [
  container,
  pagination
]

const install = Vue => {
  if (install.installed) return false

  for (let i = 0, len = components.length; i < len; i++) {
    const component = components[i]
    Vue.component(component.name, component)
  }

  install.installed = true
}

export default install
