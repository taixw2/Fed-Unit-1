const merge = require('webpack-merge').merge
const commonConfig = require('./webpack.common')

/**
 * 使用 webpack-merge 合并通用规则
 */
module.exports = merge(commonConfig.config, {
  /**
   * 设置开发模式为 development
   */
  mode: 'development',
  /**
   * 设置 sourcemap 类型
   * 忽略列信息,并且保留源代码格式的 source-map
   */
  devtool: 'cheap-module-source-map',
  devServer: {
    /**
     * 设置 dev server, 需要安装 webpack-dev-server
     * 默认打开一个 chrome tab
     * 打开热替换模式
     */
    port: 2020,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        oneOf: [
          {
            // 支持 less modules
            resourceQuery: /module/,
            use: commonConfig.styleLoader('style-loader', true, 'less-loader'),
          },
          {
            use: commonConfig.styleLoader('style-loader', false, 'less-loader'),
          },
        ],
      },
      {
        test: /\.css$/,
        oneOf: [
          {
            // 支持 css modules
            resourceQuery: /module/,
            use: commonConfig.styleLoader('style-loader', true),
          },
          {
            use: commonConfig.styleLoader('style-loader', false),
          },
        ],
      },
    ],
  },
})
