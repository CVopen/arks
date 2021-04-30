import style from './index.module.scss'
import { useState, useEffect } from 'react'
export default function Back() {
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
  })
  const [ num, setNum ] = useState(0)
  const [ isAnimate, setAnimate ] = useState(false)
  const [ isRotate, setRotate ] = useState(false)

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 滚动高度
    const scrollheight = document.body.scrollHeight || document.body.scrollHeight // 页面总高
    const innerHeight = window.innerHeight // 视口高度
    setNum(parseInt(scrollTop / (scrollheight - innerHeight) * 100) + '%')
    
  }

  const handleClick = () => {
    window.scrollTo(0, 0)
  }
  
  const animationImg = () => {
    if (isAnimate || !(!num || num === '0%')) return
    setAnimate(true)
    setRotate(!isRotate)
    setTimeout(() => {
      setAnimate(false)
    }, 300)
  }

  return (
    <div className={style.back} onClick={animationImg}>
      {
        (!num || num === '0%') ? 
          <img className={isRotate ? style['img-rotate'] : ''} src={require('../../assets/images/more.png').default} /> :
          num
      }
    </div>
  )
}
