const sassResourcesLoader = require('craco-sass-resources-loader');
const webpack = require("webpack")
const compressionWebpackPlugin = require("compression-webpack-plugin")
const path = require('path')
const resolve = pathUrl => path.join(__dirname, pathUrl)

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src'),
      '@assets': resolve('src/assets'),
      '@utils': resolve('src/utils')
    },
    configure: (webpackConfig, {env, paths}) => {
      // 关闭打包时生成的map文件
      // process.env.GENERATE_SOURCEMAP = 'false';
      paths.appBuild = 'dist'
      webpackConfig.output = {
        ...webpackConfig.output,
        path: path.resolve(__dirname, 'dist'),
        publicPath: env === 'production' ? '/static/blog/' : '',
      }
      webpackConfig.plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/))
      webpackConfig.plugins.push(new compressionWebpackPlugin({
        filename: '[path][base].gz', // 目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
        algorithm: 'gzip', // 算法       
        test: new RegExp('\\.(js|css)$'), // 压缩 js 与 css
        threshold: 10240, // 只处理比这个值大的资源。按字节计算
        minRatio: 0.8 // 只有压缩率比这个值小的资源才会被处理
      }))
      return webpackConfig
    }
  },
  plugins: [
    {
      plugin: sassResourcesLoader,
        options: {
          resources: [
            './src/assets/style/index.scss',
          ],
        },
    }
  ],
  devServer:{
    proxy: {
      "/blog": {
        target: 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: {
          "^/blog": "/blog"
        }
      },
    } 
  }
}