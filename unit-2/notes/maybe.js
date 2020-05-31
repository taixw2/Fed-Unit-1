// maybe 用来解决传入的 null 导致的异常

class MaybeFunctor {
  static of(value) {
    return new MaybeFunctor(value);
  }

  constructor(value) {
    this._value = value;
  }
  map(fn) {
    return this.isNothing ? MaybeFunctor.of(null) : MaybeFunctor.of(fn(this._value));
  }

  get isNothing() {
    return this._value === null || this._value === undefined;
  }
}

const rst = MaybeFunctor.of(3).map(() => null).map(v => v * 2)
console.log("value", rst)
