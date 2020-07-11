const path = require('path')
const merge = require('webpack-merge').merge
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const commonConfig = require('./webpack.common')

/**
 * 使用 webpack-merge 合并通用规则
 */
module.exports = merge(commonConfig.config, {
  /**
   * 设置开发模式为 production
   */
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    /**
     * 正式环境中采用 contenthash 模式
     * 能够避免在浏览器中使用缓存
     */
    filename: 'js/[name]-[contenthash:8].js',
  },
  /**
   * 设置 sourcemap 类型
   * 提示输出的文件位置信息, 但是无法查看源文件
   * 利于排查错误, 而避免源代码泄露
   */
  devtool: 'nosources-source-map',
  module: {
    rules: [
      {
        test: /\.less$/,
        oneOf: [
          {
            // 支持 less modules
            resourceQuery: /module/,
            use: commonConfig.styleLoader(
              MiniCssExtractPlugin.loader,
              true,
              'less-loader'
            ),
          },
          {
            use: commonConfig.styleLoader(
              MiniCssExtractPlugin.loader,
              false,
              'less-loader'
            ),
          },
        ],
      },
      {
        test: /\.css$/,
        oneOf: [
          {
            // 支持 css modules
            resourceQuery: /module/,
            use: commonConfig.styleLoader(MiniCssExtractPlugin.loader, true),
          },
          {
            use: commonConfig.styleLoader(MiniCssExtractPlugin.loader, false),
          },
        ],
      },
    ],
  },

  /**
   * 使用 mini css extract plugin 提取 css
   */
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
  ],
})
