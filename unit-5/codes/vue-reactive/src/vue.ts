import Observer from './observer'
import Compiler from './compiler'

interface Option {
  data: () => { [key: string]: any }
  methods: { [key: string]: any }
  el: string | HTMLElement
}

export default class Vue {
  $options: { [key: string]: any }
  $data: { [key: string]: any }
  $methods: { [key: string]: any }
  $el: HTMLElement

  constructor(option: Option) {
    this.$options = option
    this.$data = option.data() || {}
    this.$methods = option.methods || {}
    this.$el =
      typeof option.el === 'string'
        ? document.querySelector(option.el)
        : option.el

    // proxyData
    this._proxyData(this.$data)
    // 
    this._mountMethod(this.$methods)
    // observer
    new Observer(this.$data)
    // compiler
    new Compiler(this)
  }

  _proxyData(data) {
    Reflect.ownKeys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        configurable: true,
        enumerable: true,

        get() {
          return Reflect.get(data, key)
        },

        set(newValue) {
          return Reflect.set(data, key, newValue)
        },
      })
    })
  }

  _mountMethod(methods) {
    Reflect.ownKeys(methods).forEach((key) => {
      Reflect.set(this, key, methods[key].bind(this))
    })
  }
}
