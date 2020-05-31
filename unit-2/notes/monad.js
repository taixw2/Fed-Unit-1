const curry = (fn) =>
  function closure(...args) {
    return args.length < fn.length
      ? (...a) => closure(...[...args, ...a])
      : fn(...args);
  };

const compose = (...fns) => (value) =>
  fns.reverse().reduce((previous, current) => current(previous), value);

// 定义了 join 和 of 方法

class Maybe {
  static of(value) {
    return new Maybe(value);
  }

  constructor(value) {
    this._value = value;
  }

  map(fn) {
    return this.isNothing ? Maybe.of(null) : Maybe.of(fn(this._value));
  }

  get isNothing() {
    return this._value === null || this._value === undefined;
  }
}

const safeProps = curry(function (k, object) {
  return Maybe.of(object[k]);
});

const getZoreProp = safeProps(0);


const fn = compose(getZoreProp, getZoreProp)


console.log("rst", fn([[0, 1]]))
