import Vue from './vue'
import Watcher from './Watcher'

export default class Directive {
  $vm: Vue
  constructor(vm) {
    this.$vm = vm
  }

  udpater(node: HTMLElement, attrName: string, attrValue: string) {
    const value = Reflect.get(this.$vm, attrValue)
    if (this.isExpression(attrName)) {
      const key = attrName.substr(2)
      expression[key] && expression[key](this.$vm, node, attrValue, value)

      new Watcher(this.$vm, attrValue, (newValue: string) => {
        expression[key] && expression[key](this.$vm, node, attrValue, newValue)
      })

    } else if (this.isEvent(attrName)) {
      const key = attrName.substr(5)
      eventMap[key] && eventMap[key](node, value)
    }
  }

  private isExpression(attr: string) {
    return /v-(?!on).+/.test(attr)
  }

  private isEvent(attr: string) {
    return attr.startsWith('v-on')
  }
}

const expression = {
  text(vm: Vue, node: HTMLElement, key: string, value: string) {
    node.textContent = value
  },
  model(vm: Vue, node: HTMLInputElement, key: string, value: string) {
    const curValue = node.value
    if (curValue === value) return
    node.value = value
    node.addEventListener('input', () => {
      console.log('model -> key', key, node.value)
      vm[key] = node.value
    })
  },
  html(vm: Vue, node: HTMLElement, key: string, value: string) {
    node.innerHTML = value
  },
}

const eventMap = {
  click(node: HTMLElement, handler: any) {
    node.removeEventListener('click', handler)
    node.addEventListener('click', handler)
  },
}
