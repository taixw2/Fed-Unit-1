
// 容器, 包含一个值与处理这个值的变形关系的函数
class Container {
  constructor(value) {
    this._value = value
  }

  handler(fn) {
    return new Container(fn(this._value))
  }
}


// 函子, 一个特殊的容器，约定处理这个值的变形关系的方法叫 map
class Functor {
  constructor(value) {
    this._value = value
  }

  map(fn) {
    return new Functor(fn(this._value))
  }
}
