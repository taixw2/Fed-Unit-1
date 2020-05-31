## 简答题

### 1. 描述引用计数的工作原理和优缺点

- 工作原理：引用计数通过对对象设置一个引用数，每当对象赋值给新的变量时就会对引用数 +1, 反之则 -1, 当引用数位 0 的时候，所暂用的空间就会被销毁和回收。
- 优点：当引用数为 0 的时候立即回收空间，减少程序的暂停
- 缺点： 
    - 无法回收循环引用的对象，
    - 每一个引用都需要一个引用数来监视对象的引用，频繁的更新引用数会带来运行开销
- 使用场景： 在早期的 Netscape Navigator3 与 IE 中 DOM 与 BOM 都采用了引用计数，最后都出现了内存泄露的风险

### 2. 描述标记整理算法原理

- 工作原理：
    - 标记整理是在标记清除的基础上进行了增强，在标记阶段与标记清除保持了一直的算法，
    - 即遍历所有对象，并且对所有可达对象（活动对象）进行标记，
    - 由于标记清除会产生空间的碎片化，所以标记整理在标记完所有活动对象后会进行一次内存空间的整理，保证可用空间是连续的，
    - 最后再遍历一遍所有对象，对所有未标记的对象进行清除，并且对取消所有对象的标记
- 优点：解决引用计数的循环引用问题，以及标记清楚的空间碎片化问题
- 缺点：不会立即清除垃圾、清除的时候，程序是停止工作的
- 使用场景：
    - V8 新生代 GC 算法：当 From 暂用一定比例时，会采用标记整理对内存空间进行整理
    - V8 老生代 GC 算法：当新生代对象晋升为老生代对象，切老生代对象空间不足的时候会采用内存标记整理算法进行整理

### 3. 描述 V8 中新生代存储区垃圾回收的流程

V8 引擎将内存空间分为两部分，一部分称为新生代，另一部分称为老生代，新生代存储区用于保持存活时间较短的对象，老生代对象用于储存存活时间较长的对象，评判准则是在经过一轮 GC 后，依然存活的对象或者新生代的 From 内存区占用超过 25% 时则会从新生代存储区中晋升到老生代存储区中  
新生代存储区被分为两片等大的区域，称为 From(使用区) 和 To(空闲区), 当 From 被占用到一定比例后，则会触发 GC 的标记整理操作，接着会把所有的活动对象拷贝到 To 空间，再对 From 空间进行清空，此时再将两个区域的状态进行交换，From 状态改位 To, To 状态改为 From

### 4. 描述增量标记算法在何时使用，以及工作原理

在进行垃圾回收的时候，程序是无法运行的，为了减少垃圾回收所占用的时间，V8 对老生代存储区采用增量标记的方式优化 GC 操作，即程序运行与 GC 操作交替执行，当程序允许一定时间后，GC 再对部分可达对象进行标记，标记完后再将运行权交回给程序继续运行，从而避免 GC 占用时间过长导致程序运行卡顿

## 代码题1

### 基于下面代码完成四个练习
```javascript
const cars = [
    { name: 'Ferrari FF', horsepower: 600, dollar_value: 700000, in_stock: true },
    { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
    { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
    { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: true },
    { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 130000, in_stock: false },
]
```

### 练习一、使用函数 fp.flowRight() 重新实现下面的函数

```javascript
let isLastInStock = function(cars) {
    let last_car = fp.last(cars)
    return fp.prop('in_stock', last_car)
}

// 解：
let isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)
// test
console.log(isLastInStock([{ in_stock: false }, { name: true }]))

```

### 练习二、使用 fp.flowRight、fp.prop、fp.first 获取第一个的 name
```javascript
let isFirstInStock = fp.flowRight(fp.prop('name'), fp.first)
// test
console.log(isFirstInStock([{ name: '123' }, { name: '254' }]))
```

### 练习三、使用帮助函数 _average 函数重构 averageDollarValue, 使用函数组合实现
```javascript
let _average = function (xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
} // <-- 无需改动
let averageDollarValue = function (cars) {
    let dollar_values = fp.map(function(car) { return car.dollar_value }, cars)
    return _average(dollar_values)
}

// 解：
let getDataIfValid = fp.curry((isValid, v) => isValid(v) ? v : []);
let averageDollarValueCompose = fp.flowRight(
    _average,
    fp.map(fp.prop('dollar_value')),
    // 校验数据
    getDataIfValid(fp.every(fp.has('dollar_value')))
)

// test 
console.log(averageDollarValueCompose([{ dollar_value: 10 }, { dollar_value: 22 }]));
```

### 练习四、使用 flowRight 写一个 sanitizeNames() 函数、返回一个下划线链接的小写字符串，把数组中的 name 转换成这种形式： 例如： sanitizeNames(['Hello World']) => ['hello_world']

```javascript
let _underscore = fp.replace(/\W+/g, "_") // <-- 无需改动，并在 sanitizeNames 中使用他
let getDataIfValid = fp.curry((isValid, v) => isValid(v) ? v : []);

let sanitizeNames = fp.flowRight(
    fp.map(fp.flowRight(_underscore, fp.lowerCase)),
    // 校验数据
    getDataIfValid(fp.every(fp.isString))
)

// test
console.log(sanitizeNames(["Hell Wxx"]));
```

## 代码题二

基于下面代码完成四个练习
```javascript
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
```

### 练习 1: 使用 fp.add 和 fp.map 实现 functor 中的值增加的函数
```javascript
let maybe = Maybe.of([5, 6, 1])

const increment1 = fp.add(1)
const increment2 = fp.add(2)
let ex1 = function (functor) {
    return functor.map(fp.map(increment1))
}
let ex1_1 = function (functor) {
    return functor.map(fp.map(increment2))
}
// test
console.log(ex1(maybe))
console.log(ex1_1(maybe))
```

### 练习2： 实现 ex2 函数，能够使用 fp.first 获取列表中第一个元素
```javascript
let xs = Container.of(['do', 'ray', 'me', '...'])
let ex2 = (functor) => functor.map(fp.first)
```

### 练习3：实现　ex3　函数，使用　safeProp 和　fp.first 获取　user 中　name　字段的首字母
```javascript
let safeProp = fp.curry((x, o) => Maybe.of(o[x]))
let getValue = (functor) => functor._value
let user = { id: 2, name: 'Albert' }
let ex3 = fp.flowRight(fp.first, getValue, safeProp('name'))
// test
console.log(ex3(user));
```

### 练习４：　使用　maybe 函子重写　ex4, 不要有　if 语句
```javascript
let ex4 = function(n) {
    if (n) return parseInt(n)
}
// 解：
let ex4 = (n) => Maybe.of(n).map(parseInt)
// test
console.log(ex4Maybe("12"))
```

### 思维导图
![t1mPKK.md.png](https://s1.ax1x.com/2020/05/31/t1mPKK.md.png)
![t1m9v6.md.png](https://s1.ax1x.com/2020/05/31/t1m9v6.md.png)
