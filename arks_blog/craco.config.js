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
  ]
}