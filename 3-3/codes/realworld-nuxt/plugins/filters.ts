import Vue from 'vue'
import * as filters from '~/filters'

export default () => {
  Reflect.ownKeys(filters).forEach((key) => {
    const filter = Reflect.get(filters, key)
    if (typeof filter !== 'function') {
      return
    }

    Vue.filter(key as string, Reflect.get(filters, key))
  })
}
