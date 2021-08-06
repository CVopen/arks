module.exports = {
  devServer: {
    proxy: 'http://localhost:8000'
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/static/admin' : '',
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config.set('externals', {
        // axios: 'axios',
        'element-plus': 'ElementPlus',
        vditor: 'Vditor',
        vue: 'Vue'
      })
    })
  }
}