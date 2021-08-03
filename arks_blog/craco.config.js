const sassResourcesLoader = require('craco-sass-resources-loader');
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
      paths.appBuild = 'dist'
      webpackConfig.output = {
        ...webpackConfig.output,
        path: path.resolve(__dirname, 'dist'),
        publicPath: env === 'production' ? '/static/blog/' : '',
      }
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