import bus from './bus'
function setRem() {
  const scale = document.documentElement.clientWidth / 10
  document.documentElement.style.fontSize = scale + 'px'
  bus.emit('offsetWidth', document.body.offsetWidth > 1000)
}

// 初始化
setRem()
// 改变窗口大小时重新设置rem
window.onresize = function () {
  setRem()
}