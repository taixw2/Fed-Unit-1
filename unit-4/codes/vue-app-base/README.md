<!-- # vue-app-base

1. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
2. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
3. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
4. 尽可能的使用上所有你了解到的功能和特性 -->

# 项目说明文档

## 快速启动

```sh
# 开发环境
yarn serve # or npm run serve

# 生产环境
yarn build # or npm run build

# lint
yarn lint # or npm run lint
```

## webpack 配置

### 项目采用的 Loaders

1. vue-loader
2. css-loader
3. style-loader
4. file-loader/url-loader
5. mini-css-extract-plugin.loader

### 项目中采用的 Plugins

1. vue-loader/lib/plugin
2. html-webpack-plugin
3. hard-source-webpack-plugin
4. mini-css-extract-plugin
5. clean-webpack-plugin
6. definePlugin

### 通用的配置 webpack.common.js

通用配置中配置项目通用的配置, 比如 entry, 通用的 loader, plugins 等,  
在通用配置中使用了 **CleanWebpackPlugin** 用语避免每次打包都在原输出路径中添加新的文件, 导致输出路径臃肿  
**VueLoaderPlugin** 作为 vue-loader 必须依赖的 plugin, 它的作用是让 vue 单文件组件中的 script, style 资源匹配 webpack 中已经定义的规则  
**HtmlWebpackPlugin** 根据模板生成 html, 并且根据配置注入输出的资源(_在 MPA 中配置 chunks/excludeChunks 避免注入不需要的资源_)
**DefinePlugin** 在项目中注入变量, 用于替换在编译过程中匹配的内容
**HardSourceWebpackPlugin** 作为 webpack 的打包缓存方案, 可以有效的提升二次编译速度

### 开发环境配置 webpack.dev.js

**开发环境需要优先保证开发效率**  
启动 mode 为 development, 这样对减少对构建的体积等优化, 能够有效提高编译速度,  
设置 devtool 为 `cheap-module-source-map` 作为一种折中的 source-map 方案, 忽略列信息, 并且保留原始代码结构的一种 sourcemap
启动 devServer 的热替换 (HMR), 能够有效提高开发效率, 并且能够保留页面状态,  
单独提取了 less 以及 css 到对应的环境中, 在 dev 中使用 style-loader, 优势是构建速度, 以及支持 hmr, 在样式中使用了 css modules 用于避免 css 冲突

### 生产环境配置

**生产环境需要优先保证运行效率**  
启动 mode 为 production, 默认会启动压缩资源, tree shaking 等功能, 能够有效减少代码体积
设置 devtool 为 `nosources-source-map` 能够现实出输出信息的文件,位置等信息, 而避免源代码泄露, 有利于线上问题的排查  
启用了 min-css-extra-plugin 用语提取 css 到单独的文件中,

## Lint

采用 eslint 校验源代码
