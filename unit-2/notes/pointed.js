// ponintFree, 实现 of 静态方法的函子

class PointFreeFunctor {
  static of(value) {
    return new PointFreeFunctor(value);
  }

  constructor(value) {
    this._value = value;
  }

  map(fn) {
    return PointFreeFunctor.of(fn(this._value));
  }
}

// test
const value = PointFreeFunctor.of(3).map((x) => x * 2)._value
console.log("value = 6", value)
