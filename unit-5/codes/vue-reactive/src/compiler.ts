// 遍历 dom， 找出所有差值表达式，以及指令

import Vue from './vue'
import Watcher from './Watcher'

const regexp = /\{\{(.+?)\}\}/

export default class Compiler {
  $el: HTMLElement
  $vm: Vue

  constructor(vm) {
    this.$el = vm.$el
    this.$vm = vm
    this.compiler(this.$el)
  }

  compiler(el: HTMLElement) {
    const childNodes = el.childNodes
    if (!childNodes.length) return
    Array.from(childNodes).forEach((node) => {
      if (this.isTextNode(node)) {
        this.compilerTextNode(node)
      } else if (this.isElementNode(node)) {
        this.compilerElementNode(node)
      }
    })
  }

  compilerElementNode(node: HTMLElement) {
    node.getAttributeNames().forEach((name) => {
      if (this.isDirective(name)) {
        const key = name.substr(2)
        const value = node.getAttribute(name)
        this[key + 'Updater'](node, Reflect.get(this.$vm, value), value)
        new Watcher(this.$vm, value, (newValue: string) => {
          this[key + 'Updater'](node, newValue, value)
        })
      }
    })
    this.compiler(node)
  }

  textUpdater(node: HTMLElement, value: string) {
    const curValue = node.textContent
    if (curValue === value) return
    node.textContent = value
  }

  modelUpdater(node: HTMLInputElement, value: string, key: string) {
    const curValue = node.value
    if (curValue === value) return
    node.value = value

    node.addEventListener('input', () => {
      this.$vm[key] = node.value
    })
  }

  compilerTextNode(node: ChildNode) {
    if (regexp.test(node.textContent)) {
      const key = RegExp.$1.trim()
      node.textContent = Reflect.get(this.$vm, key)

      new Watcher(this.$vm, key, (newValue: string) => {
        node.textContent = newValue
      })
    }
  }

  isDirective(attr: string) {
    return attr.startsWith('v-')
  }

  isTextNode(node: ChildNode): node is HTMLElement {
    return node.nodeType === 3
  }

  isElementNode(node: ChildNode): node is HTMLElement {
    return node.nodeType === 1
  }
}
