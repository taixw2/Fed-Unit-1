// 遍历 dom， 找出所有差值表达式，以及指令

import Vue from './vue'
import Watcher from './Watcher'
import Directive from './directive'

const regexp = /\{\{(.+?)\}\}/

export default class Compiler {
  $el: HTMLElement
  $vm: Vue
  $directive: Directive

  constructor(vm) {
    this.$el = vm.$el
    this.$vm = vm
    this.$directive = new Directive(vm)
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
    node.getAttributeNames().forEach((attrName) => {
      this.$directive.udpater(node, attrName, node.getAttribute(attrName))
    })
    this.compiler(node)
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

  isTextNode(node: ChildNode): node is HTMLElement {
    return node.nodeType === 3
  }

  isElementNode(node: ChildNode): node is HTMLElement {
    return node.nodeType === 1
  }
}
