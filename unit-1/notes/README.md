## 学习笔记

### 第一节：
1. ECMAScript 是 Javascript 的扩展语言，
2. Javascript 实现了 ECMAScript 的语言标准，并且宿主环境对 Javascript 进行增强，提供了 诸如 DOM、BOM 等功能
3. ECMAScript 从 2015 年开始，每年迭代一个版本，并且从 2015 开始采用年号定义 ECMAScript 的版本
4. ES6 是 ECMAScript 在没有确定版本号的时候的称呼，以至于之后一直沿用

**ECMAScript 2015 解决的问题**
1. 解决原有语法的不足与问题
2. 对原有语法增强
3. 提供新的对象、新的方法、新的功能
4. 提供全新的数据类型与结构

### let 与 const

1. let 声明的变量智能在所声明的代码块中被访问
2. for 循环中声明的变量，作用域 for 循环的块级作用域中
3. 闭包是借助函数作用域拜托块级作用域的影响
4. for 循环内部存在两层作用域