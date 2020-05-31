const fp = require('lodash/fp')

class Container {
    static of (value) {
        return new Container(value)
    }

    constructor (value) {
        this._value = value
    }

    map (fn) {
        return Container.of(fn(this._value))
    }
}

class Maybe {
    static of (value) {
        return new Maybe(value)
    }

    constructor (value) {
        this._value = value
    }

    isNothing () {
        return this._value === null || this._value === undefined
    }

    map (fn) {
        return this.isNothing() ? this : Maybe.of(fn(this._value))
    }
}

// 练习 1: 使用 fp.add 和 fp.map 实现 functor 中的值增加的函数
let maybe = Maybe.of([5, 6, 1])
const increment1 = fp.add(1)
let ex1 = (functor) => functor.map(fp.map(increment1))
console.log(ex1(maybe))

// 练习2： 实现 ex2 函数，能够使用 fp.first 获取列表中第一个元素
let xs = Container.of(['do', 'ray', 'me', '...'])
let ex2 = (functor) => functor.map(fp.first)
console.log(ex2(xs));

// 练习3：实现　ex3　函数，使用　safeProp 和　fp.first 获取　user 中　name　字段的首字母
let safeProp = fp.curry((x, o) => Maybe.of(o[x]))
let getValue = (functor) => functor._value
let user = { id: 2, name: 'Albert' }
let ex3 = fp.flowRight(fp.first, getValue, safeProp('name'))
console.log(ex3(user));

// 练习４：　使用　maybe 函子重写　ex4, 不要有　if 语句
let ex4 = function(n) {
    if (n) return parseInt(n)
}

let ex4Maybe = (n) => Maybe.of(n).map(parseInt)
console.log(ex4Maybe("12"))