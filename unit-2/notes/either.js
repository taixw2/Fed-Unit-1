// either 通常用来检测异常情况

class LeftFunctor {
  static of(value) {
    return new LeftFunctor(value)
  }

  constructor(value) {
    this._value = value
  }

  map(fn) {
    return this
  }
}

class RightFunctor {
  static of(value) {
    return new LeftFunctor(value)
  }

  constructor(value) {
    this._value = value
  }

  map(fn) {
    return RightFunctor.of(fn(this._value))
  }
}

function JSONParse(json) {
  try {
    return RightFunctor.of(JSON.parse(json))
  } catch (error) {
    return LeftFunctor.of(error.toString())
  }
}

const jsonFunctor = JSONParse("abc").map(x => x.substr(0, 10))
console.log("jsonFunctor", jsonFunctor._value)
