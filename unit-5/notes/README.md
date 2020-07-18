# 3-1

## Vue 基础回顾

### 基础结构

- render 的 h 参数的作用是创建虚拟 DOM
- \$mount: 把虚拟 DOM 挂载到真实 DOM 中

### 生命周期

1. 初始化事件, 生命周期, 成员, h 函数等
2. beforeCreate
3. 初始化注入 & 校验 (注入 data & props 等)
4. created (此时可以访问 data & props)
5. 把 template 编译成 render 函数
6. beforeMount (此时无法访问 DOM)
7. 使用 vm\$el 替换 el
8. mounted (此时可以访问 DOM)
9. ---- 修改 ----
10. beforeUpdate
11. 对虚拟 DOM 进行 diff
12. updated
13. ---- 销毁 ----
14. beforeDestory
15. destoryed

### 语法和概念

1. 插值表达式 {{ xxx }}
2. 指令 v-xx
3. 计算属性和侦听器 watch, computed
4. Class 和 Style 绑定 (修改样式)
5. 条件渲染/列表渲染 v-if/v-for
6. 表单输入绑定 v-model
7. 组件 <Component>
8. 插槽 <slot>
9. 插件 vue-router
10. mixin
11. 响应式原理

## Vue Router 原理实现

1. Hash 和 History 模式
2. 模拟实现 Vue Router

传入 router 会在 vm 中注入 $route, $router

1. \$route 路由规则, 路径
2. \$router 路由对象, 提供路由功能的方法

\$router 中的 push 和 replace 以及 go

1. replace 不会记录历史
2. push 记录历史记录
3. go(n) 进入到第 n 个页面

### hash 与 history

1. hash
   1. 基于锚点以及 onhashchange 事件进行陆游
   2. hash 改变后会调用 onhahschange, 并且在访问历史中添加一条数据
2. history
   1. 基于 HTML5 中的 History Api 进行路由, 提供前端陆游
      1. history.pushState
      2. history.replaceState
   2. 使用
      1. 需要服务器支持 (向服务器发送请求会找不到页面)
      2. 在服务器中除了静态资源之外都返回 index.html 路径
      3. 在 nginx 中配置 history 模式
         1. 在 server 中配置 `try_files $uri $uri/ /index.html` (尝试查找 uri 文件, 如果找不到者返回 index.html)

### Vue Router 实现

#### 实现 map

1. 原始映射关系
2. 处理有的路由映射关系
3. 当前陆游

---

1. 注册插件
2. 注册组件 router-view
3. 创建实际的映射关系

#### 实现步骤

1. 记录 Vue 到全局变量,
2. 创建 vue 实例的时候注入 router/route 对象
   1. 在 prototype 上添加属性
   2. 利用混入 mixin
3. 构造函数
   1. 记录参数\路由映射关系
   2. 利用 Vue.observer 创建相应式对象
4. createRouteMap 解析路由规则成键值对
5. router-view
   1. 获取当前路由地址
   2. 通过 routeMap 找到当前路由地址对对应的组件
6. router-link
   1. 通过 history.pushState 修改地址栏
   2. 设置响应式的 currentRoute 属性
7. 前进/后退
   1. 监听 popstate 监听页面的前进后退, pushState 和 replaceState 不会触发这个事件

> 完整版的 Vue 和运行时的 Vue, 完整版的 Vue 支持编译 template 成 render 函数, 但是运行效率会变低

### Vue 实现

#### 发布订阅/观察者模式

1. 发布订阅有一个消息中心, 发布者和订阅者是通过消息中心解偶的, 发布有由消息中心通知所有订阅者
2. 观察者模式是耦合的, 所有观察者都由发布者通知,没有 i 消息中心的存在, 发布者收集所有观察者,并且由发布者派发

#### Vue 响应式实现步骤

1. 通过属性保存选项的数据
   1. data 原始 data
   2. options 所有的 options
   3. el 挂载的节点
2. 把 data 转换成 proxy 对象, 并且挂载在实例上
3. 监听 data 的变化
   1. observer
      1. walk 把对象转换成响应式数据
4. 解析指令和插值表达式
   1. 负责编译模板
   2. 负责页面首次渲染
   3. 当前数据变化后重新渲染视图
   - compile 编译
   - compileElement 编译元素节点中的指令, 遍历 attributes
   - compileText 编译文本节点的插值表达式
   - isDirective 判断元素属性是否指令
   - isTextNode
   - isElementNode
5. 通过观察者模式驱动视图变化
   1. 当数据发生变化时, 通知所有 watcher 更新试图
   2. watcher 实例化时添加到 Dep 中
6. 双向绑定
   1. 数据发生变化改变视图
   2. 当视图发生变化的时候更新数据

> 总结: 把 data 转换成响应式对象, 对象被读取的时候收集以来, 对象属性被设置的时候通知所有依赖更新
