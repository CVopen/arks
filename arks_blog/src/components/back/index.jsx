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

  const handleClickToTop = () => {
    if (isAnimate) return
    setAnimate(true)
    const speed = 50
    const timer = setInterval(() => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 滚动高度
      if (scrollTop - speed > 0) {
        window.scrollTo(0, scrollTop - speed)
      } else {
        window.scrollTo(0, 0)
        clearInterval(timer)
        setAnimate(false)
      }
    }, 20);
  }

  const handleClickToBottom = () => {
    if (isAnimate) return
    setAnimate(true)
    const scrollheight = document.body.scrollHeight || document.body.scrollHeight // 页面总高
    const innerHeight = window.innerHeight // 视口高度
    const speed = 50
    const timer = setInterval(() => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 滚动高度
      if (scrollTop + speed < scrollheight - innerHeight) {
        window.scrollTo(0, scrollTop + speed)
      } else {
        window.scrollTo(0, scrollheight - innerHeight)
        clearInterval(timer)
        setAnimate(false)
      }
    }, 20);
  }
  
  const animationImg = () => {
    if (isAnimate) return
    setAnimate(true)
    setRotate(!isRotate)
    setTimeout(() => {
      setAnimate(false)
    }, 300)
  }

  return (
    <div className={style.back}>
      <div className={style.num} onClick={animationImg}>
        {
          (!num || num === '0%') ? 
            <img
              className={isRotate ? style['img-rotate'] : ''} src={require('../../assets/images/more.png').default} 
              alt="more"
            /> :
            num
        }
      </div>
      
      <div 
        className={[style.top, isRotate ? style['top-open'] : ''].join(' ')}
        onClick={handleClickToTop}
      />
      <div
        className={[style.bottom, isRotate ? style['bottom-open'] : ''].join(' ')}
        onClick={handleClickToBottom}
      />
    </div>
  )
}
