const fp = require('lodash/fp')
const data = require('./data')
// 使用函数组合实现下列函数

let isLastInStock = function(cars) {
    let last_car = fp.last(cars)
    return fp.prop('in_stock', last_car)
}


// 练习1
let isLastInStockCompose = fp.flowRight(fp.prop('in_stock'), fp.last)


// 练习2
let isFirstInStock = fp.flowRight(fp.prop('name'), fp.first)
console.log(isFirstInStock(data.cars))

// 练习3
let _average = function (xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
}
// 无需改动

let averageDollarValue = function (cars) {
    let dollar_values = fp.map(function(car) { return car.dollar_value }, cars)
    return _average(dollar_values)
}

// 解：
let getDataIfValid = fp.curry((valid, v) => valid(v) ? v : []);
let averageDollarValueCompose = fp.flowRight(
    _average,
    fp.map(fp.prop('dollar_value')),
    // 校验数据
    getDataIfValid(fp.every(fp.has('dollar_value'))),
    getDataIfValid(Array.isArray)
)
console.log(averageDollarValueCompose(data.cars));

// 练习四
let _underscore = fp.replace(/\W+/g, "_") // <-- 无需改动，并在 sanitizeNames 中使用他

let sanitizeNames = fp.flowRight(
    fp.map(fp.flowRight(_underscore, fp.lowerCase)),
    // 校验数据
    getDataIfValid(fp.every(fp.isString)),
    getDataIfValid(Array.isArray)
)


console.log(sanitizeNames(["Hell Wxx"]));

