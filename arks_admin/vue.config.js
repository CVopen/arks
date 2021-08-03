module.exports = {
  devServer: {
    proxy: 'http://localhost:8888'//服务器域名，80端口是默认的，可以不用配置
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/static/admin' : ''
}