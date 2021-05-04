import style from './index.module.scss'
import { useState, useEffect } from 'react'
import bus from '../../utils/bus'
export default function Back() {
  useEffect(() => {
    bus.on('scrollTop', comNum)
  }, [])
  const [ num, setNum ] = useState(0)
  const [ isRotate, setRotate ] = useState(false)

  const handleClickToTop = () => {
    let timer = null
    if (timer) return
    const speed = 50
    timer = setInterval(() => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 滚动高度
      if (scrollTop - speed > 0) {
        window.scrollTo(0, scrollTop - speed)
      } else {
        window.scrollTo(0, 0)
        clearInterval(timer)
      }
    }, 20);
  }

  const handleClickToBottom = () => {
    let timer = null
    if (timer) return
    const scrollheight = document.body.scrollHeight // 页面总高
    const innerHeight = document.body.offsetHeight  // 视口高度
    const speed = 50
    timer = setInterval(() => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 滚动高度
      if (scrollTop + speed < scrollheight - innerHeight) {
        window.scrollTo(0, scrollTop + speed)
      } else {
        window.scrollTo(0, scrollheight)
        clearInterval(timer)
      }
    }, 20);
  }

  // 计算
  const comNum = (top) => {
    const scrollheight = document.body.scrollHeight // 页面总高
    const innerHeight = document.body.offsetHeight  // 视口高度
    const result = top / (scrollheight - innerHeight)
    setNum(!result ? 0 : parseInt(result * 100) + '%')
  }

  return (
    <div className={style.back}>
      <div className={style.num} onClick={() => setRotate(!isRotate)}>
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
