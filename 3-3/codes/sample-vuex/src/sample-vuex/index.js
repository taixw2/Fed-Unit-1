let _Vue = null

export default class SampleVuex {
  /**
   *
   * @param {import('vue').VueConstructor} Vue
   */
  static install(Vue) {
    _Vue = Vue
    Vue.mixin({
      beforeCreate() {
        if (this.$parent) {
          this.$store = this.$parent.$store
          return
        }
        this.$store = this.$options.store
      },
    })
  }

  static Store = class Store {
    constructor(options) {
      console.dir(_Vue)
      this.state = _Vue.observable(options.state || {})
      
      this.mutations = options.mutations || {}

      this.actions = options.actions || {}

      this.getters = new Proxy(options.getters || {}, {
        get(context, key) {
          const handler = Reflect.get(context, key)
          if (typeof handler !== 'function') {
            return handler
          }
          return handler(this.state)
        },
        set() {
          throw new Error('getter cannot set')
        },
      })
    }

    dispatch(type, payload) {
      this.actions[type](this, payload)
    }

    commit(type, payload) {
      this.mutations[type](this.state, payload)
    }
  }
}
