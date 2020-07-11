const path = require('path')
const webpack = require('webpack')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    /**
     * 默认输出路径采用固定名称
     * production 模式下采用 contenthash
     */
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        /**
         * 采用 vue-loader 编译 所有以 .vue 结尾的文件
         */
        use: ['vue-loader'],
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,

        /**
         * 采用 babel-loader 编译 js 文件,
         * 并且排除 node_modules 地下的 js
         */
        loader: 'babel-loader',
      },

      {
        test: /\.(png|jpe?g|.gif)$/,
        use: [
          /**
           * 采用 url-loader 编译图片文件
           * 对于超出 limit 的内部会采用 file-loader
           * 所以需要安装 file-loader
           */
          {
            loader: 'url-loader',
            options: {
              limit: 2 * 1024,
              esModule: false,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    /**
     * 每次启动前都清除 output 路径, 避免产生多余的文件
     */
    new CleanWebpackPlugin(),

    /**
     * vue 配套的插件
     * 他的作用是把 webpack 已经定义的规则应用到单文件组件中
     * 比如: /\.js$/ 规则会被应用到 vue 文件的 script 中
     */
    new VueLoaderPlugin(),

    /**
     * 根据模板自动生成 html 文件,
     * 并且注入输出的资源文件
     */
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public/index.html'),
      title: 'Vue Webpack Demo',
    }),

    /**
     * 先整个环境中注入环境变量
     */
    new webpack.DefinePlugin({
      BASE_URL: "'./'",
    }),

    /**
     * 一种持久的缓存插件,能够加快编译速度
     * 并且不会因为重启使缓存失效
     */
    new HardSourceWebpackPlugin(),
  ],
}

exports.config = config

/**
 * 生成样式 loader
 */
exports.styleLoader = (styleLoader, modules, ...otherLoader) => {
  return [
    styleLoader,
    {
      loader: 'css-loader',
      options: {
        modules: modules && {
          localIdentName: '[local]_[hash:base64:5]',
        },
      },
    },
    ...otherLoader,
  ]
}
