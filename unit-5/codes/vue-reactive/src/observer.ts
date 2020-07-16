import Dep from './dep'

export default class Observer {
  constructor(data) {
    this._walk(data)
  }

  _walk(data: { [key: string]: any }) {
    if (!data || typeof data !== 'object') {
      return
    }

    Reflect.ownKeys(data).forEach((key: string) => {
      this._proxyData(data, key, data[key])
    })
  }

  _proxyData(data: { [key: string]: any }, key: string, val: any) {
    this._walk(val)
    const dep = new Dep()

    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get() {
        Dep.target && dep.addSubs(Dep.target)
        return val
      },
      set(newValue) {
        if (newValue === val) return
        val = newValue
        dep.notify()
      },
    })
  }
}
