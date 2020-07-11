1. 模块化是当前最重要的开发范式之一
2. 模块化仅仅是一个思想或者是一个理论
3. 模块化是一种最主流的代码组织方式
4. 模块化能够减低维护成本,增加开发效率

## 目录

1. 模块化的演变过程
2. 模块化的规范

### 演变过程

1. 基于文件划分, 将每个功能放在单独的文件中, 由多个 script 标签引入模块
   1. 污染全局作用域
   2. 命名冲突问题
   3. 无法管理模块之间的依赖关系
2. 每个文件只设置一个儿全局变量,所有成员都放在全局变量上
3. IIFE, 采用自执行函数封装模块,
   1. 实现似有成员
   2. 导出的成员挂在全局对象上
   3. 通过传入参数给自执行函数,实现模块依赖管理

### 模块化规范

1. 以上依赖开发者之间约定来实现,缺少统一的规范
2. 模块化规范+模块化实现器
   1. commonjs
      1. 一个文件就是一个模块
      2. 每个模块都有一个单独的作用域
      3. 同步加载模块
      4. 通过 module.exports 导出模块
      5. 通过 require 导入模块
   2. AMD(社区产物) + require.js
      1. 通过 define 定义模块
      2. 通过 require 加载模块
   3. CMD(阿里) + seajs
      1. 为了和 commonjs 更接近

### ES Module(ESM)

1. ECMAScript 2016 引入(运行环境的兼容性)
2. 基本特点
   1. script 标签, type 设置成 module
   2. 自动采用严格模式
   3. 每个 esm 都是运行在单独的作用域中
   4. 外部的 JS 文件采用 CORS 请求
   5. 自动延迟执行脚本(defer)
3. 导出导入
   1. import
   2. export
      1. 导出成员作为 default, 在导入中必须重命名 `export { foo as default }`
   3. 注意事项
      1. export 导出的不是对象字面量, 语法通过 as 设置别名
      2. import 不是对对象的结构
      3. export default 后面的才是表达式
      4. ESM 导出的是变量的引用
      5. import 引入的变量是只读的常量
      6. ESM import 导入完整的文件名
      7. import 后面加文件路径是 import {} from '' 的简写
      8. import 函数动态导入
   4. export {} from 'xx' 导出导入成员
4. 兼容性问题
   1. 使用 esm polyfill
   2. 配置 nomodule 使支持 esm 的浏览器不执行 polyfill

### Nodejs for ESM

1. nodejs v8.5 开始支持 esm
2. 增加 experimental-modules 启用 esm
3. 在 ESM 中可以引入 commonjs 导出的模块
   1. commonjs 中只导出一个成员
4. commonjs 中不能引入 esm
5. nodejs 中 使用 esm 无法使用 **filename, **dirname 等全局变量
   1. import.meta 可以获取到 \_\_filename
6. node 最新版本对 esm 增强,
   1. 设置 package.json 中设置 type: module 设置成当前环境是 esm
   2. 设置 commonjs 模块需要增加 .cjs 后缀

### 模块化打包

#### 兼容性问题

- ESM 导致网络请求过多，每一个模块都需要从网络中下载
- 只支持 js 资源作为模块

#### 打包工具

- 支持编译新特性
- 支持把所有模块打成一个 bundle
- 支持编译所有资源模块

#### webpack

> webpack 只对 import export 相关模块化规范语法进行转换,并不会对其他代码进行编译, 需要依赖对应的 loader

- 配置文件
  - entry 配置入口文件
  - output 配置输出文件
  - filename 文件名
  - path 输出目录
  - publicPath 资源跟路径
- mode 打包模式
  - development 优化打包速度
  - production 优化打包大小
  - none
- 打包后文件运行原理
  - 整体是一个 iife
  - 函数接收一个 modules 参数
  - 传入的 modules 是一个数组
  - 数组中每一个元素都是有一个函数包裹的私有作用域
  - 私有作用域中的代码就是源代码
  - 私有作用域中接收 module, export 等参数
  - 接收到 modules 后会执行第一个元素
- Loader
  - webpack 默认只支持 js 模块，在没有使用 loader 是会采用 js 的规则去解析代码
  - cssloader 只提供解析 css 的功能， styleloader 是把 css 通过 style 标签导入
  - fileloader
    - 将匹配的资源拷贝到输出路径
    - 将输出路径返回给 export
    - 路径中跟上 publicPath
- urlloader
  - data-url
    - 协议+媒体类型+编码方式+内容
    - date:type;method,content
    - data:text/html;charset=UTF-8,helloworld
- 加载器分类
  - 编译转化类型加载器
    - 对输入数据进行编译再输出
  - 文件类型加载器
    - 对输入文件进行操作,再输出
  - lint 类型加载器
    - 对输入代码进行校验
- 加载方式
  - ESM
  - Commonjs
  - AMD
  - 独立的 loader
    - css loader 触发 @import
    - html loader 触发 src 等
- 核心工作原理
  - 根据配置找到入口,从入口中匹配到模块规范的关键字, 从而生成一个以入口为顶点的依赖树, 最后再遍历这个依赖树,最后生成出对于的资源
- loader
  - webpack 的核心机制
  - loader 函数
    - 输入是一个 参数,参数的值就是匹配到的文件内容
    - 输入必须是一段标准的 javascript 代码, 否则就需要继续依赖另一个 loader 来处理
    - JSON.stringify 转译字符窜
- plugin
  - 为了增强项目自动化的工具
  - loader 只触发对应匹配文件, plugin 则匹配不同节点上定义的钩子
  - plugin 函数
    - 函数或者拥有 apply 方法的类
    - apply 接收一个参数
- 理想的开发环境
  - 以 http 去运行文件
  - 能够 mock api
  - 自动构建,自动刷新
    - watch 实现自动构建
    - browserSync 自动刷新
    - 集成工具 webpack dev server
  - 提供 source map
- webpack dev server
  - 独立的包: webpack-dev-server
  - 所有的资源都在内存中处理, 再访问的时候再从内存中读取,最后通过 http 返回给客户端
  - contentBase 设置需要单独加入到内存中的目录
  - 代理 API
    - CORS
    - 通过配置 proxy 代理 api
      - key 是需要匹配的地址
      - value 中 target 是需要转发到的路径
      - pathRewrite 需要重写的路径
- source map
  - 实际开发过程中与实际运行的代码不一致
  - 映射转换后的代码与转换前的代码的映射关系
  - 结构
    - version 标准版本
    - sources 已经转换的文件
    - names 原始对应的名词
    - mappings: 转换后的代码与转换前代码的字符映射
  - sourceMapingURL=source map 路径
  - 在 webpack 中配置 devtool
  - source map 类型
    - none
    - eval (定位源代码的文件名称)
    - cheap-eval-source-map
    - cheap-module-eval-source-map
    - eval-source-map
    - cheap-source-map
    - cheap-module-source-map
    - inline-cheap-source-map
    - inline-cheap-module-source-map
    - source-map
    - inline-source-map
    - hide-source-map
    - nosource-source-map
  - 类型解释
    - cheap 阉割版的 source-map (只能定位到行)
    - module 没有经过编译前的源代码
    - eval 只能定位到文件
    - nosource 没有源代码
    - source-map 定位到文件的行列
- webpack 自动刷新的问题
  - 无法保留状态(input 中已经输入的文字)
    - 写死状态
    - 通过逻辑代码保留原来的状态
- HMR
  - 在运行过程中实时的替换模块,而不会影响到页面中的状态
  - 在 webpack dev server 中启动 hot 属性, 导入 webpack.HotModuleReplacePlugin
  - CSS 会自动更新, Javascript 需要独立配置
    - HMR 不是开箱及用的
    - 需要手动处理模块热替换逻辑
  - HMR APIs
    - module.hot.accept 注册热替换模块
      - 第一个参数是路径
      - 第二个参数是处理函数
  - 热替换 JS 文件需要手动保留页面中的状态
  - 注意事项:
    - HMR 热替换需要注意异常情况,当出现异常情况需要中断 HMR
    - 需要判断当前环境是否支持 HMR
    - 热替换额外代码对生产环境没有意义,所以在打包时会自动去掉
- tree shaking
  - 主要目的就是删除为引用的代码
  - 是一组功能搭配后的优化效果
    - 不导出外部未引用的代码
    - 删除没有被使用的变量
  - tree shaking 必须使用 ESM
    - 在 babel 中可能把 module 转成 commonjs
- sideEffects
  - 需要确保代码是没有副作用的
  - 在 package.json 中的 sideEffects 配置哪些是有副作用的代码,避免被误伤

**总结**

1. webpack 有三种模式 development, production, none
2. Loader 接收源代码, 返回的必须是一个可以运行的 js 表达式
3. 一个完整的项目一般配合 url-loader, file-loader, babel-loader, style-loader, css-loader
4. webpack dev server 提供一系列开发环境的配置集合
5. source-map 用于源代码与编译后的代码之间的映射关系,有一下几种类型
   1. cheap
   2. nosource
   3. hidden
   4. module
   5. eval
6. HMR 作用于在代码运行过程中更新某个修改的模块, HRM 不是一个开箱即用的功能,需要手动添加代码逻辑 module.hot.accept 注册 HMR
7. Tree Shaking 减少代码体积,主要目的是删除带代码中未被使用过的引用, 是由一系列优化策略的组合,如不导出未引用的属性
8. sideEffects 用于避免 tree shaking 误伤代码
