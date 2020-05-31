function compose(...fns) {
  return (value) =>
    fns.reverse().reduce((previous, current) => current(previous), value);
}

// IO 函子为了把非纯的执行动作延迟处理, 惰性执行
class IO {
  static of(value) {
    return new IO(() => {
      return value;
    });
  }

  constructor(value) {
    this._value = value;
  }

  map(fn) {
    return new IO(compose(fn, this._value));
  }
}

// test
const toString = function (v) {
  return String(v);
};

const toUpperCase = function (v) {
  return String(v).toUpperCase();
};

const split = function (v) {
  return String(v).split("");
};

const fn = compose(split, toUpperCase, toString);
console.log("fn", fn(12345));
// fn [ '1', '2', '3', '4', '5' ]

const rst = IO.of("hello world").map(toUpperCase).map(split);
console.log("rst", rst._value());
// rst [
//   'H', 'E', 'L', 'L',
//   'O', ' ', 'W', 'O',
//   'R', 'L', 'D'
// ]

exports.IO = IO;
