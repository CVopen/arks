import bus from './bus'

const handleScroll = () => {
  let timer = null
  return () => {
    if (timer) return
    timer = setTimeout(() => {
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop  // 滚动高度
      // 将滚动值传递给header控制颜色
      bus.emit('scrollTop', Math.round(scrollTop) || window.location.hash === '#/404')
      timer = null
    }, 40)
  }
}
window.addEventListener("scroll", handleScroll(), true);