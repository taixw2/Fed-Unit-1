import Dep from './dep'
import Vue from './vue'

export default class Watcher {
  $vm: Vue
  $key: string
  $cb: any
  $oldValue: any

  constructor(vm: Vue, key: string, cb: any) {
    this.$vm = vm
    this.$key = key
    this.$cb = cb

    Dep.target = this
    this.$oldValue = Reflect.get(vm, key)
    Dep.target = null
  }

  update() {
    const newValue = this.$vm[this.$key]
    if (newValue === this.$oldValue) return
    this.$cb(newValue)
  }
}
