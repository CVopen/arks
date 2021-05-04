import style from './index.module.scss'
import { useState, useEffect, useRef } from 'react'
import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined, PoweroffOutlined, MoreOutlined } from '@ant-design/icons'
import bus from '../../utils/bus'
export default function Back() {
  useEffect(() => {
    bus.on('scrollTop', comNum)
  }, [])
  const [ num, setNum ] = useState(0)
  const [ isRotate, setRotate ] = useState(false)
  let timer = useRef()

  const handleClickToTop = () => {
    clearInterval(timer.current)
    const speed = 50
    timer.current = setInterval(() => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 滚动高度
      if (scrollTop - speed > 0) {
        window.scrollTo(0, scrollTop - speed)
      } else {
        window.scrollTo(0, 0)
        clearInterval(timer.current)
      }
    }, 20)
  }

  const handleClickToBottom = () => {
    clearInterval(timer.current)
    const scrollheight = document.body.scrollHeight // 页面总高
    const innerHeight = document.body.offsetHeight  // 视口高度
    const speed = 50
    timer.current = setInterval(() => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 滚动高度
      if (scrollTop + speed < scrollheight - innerHeight) {
        window.scrollTo(0, scrollTop + speed)
      } else {
        window.scrollTo(0, scrollheight)
        clearInterval(timer.current)
      }
    }, 20)
  }

  const handleClickOpen = () => {
    const style = document.getElementsByTagName('body')[0].style
    let color = '#fff'
    console.log(style.getPropertyValue('--theme-colorbg'));
    if (!style.getPropertyValue('--theme-colorbg') || style.getPropertyValue('--theme-colorbg') === '#fff') {
      color = '#000'
    }
    style.setProperty('--theme-colorbg', color)
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
            <MoreOutlined className={isRotate ? style['img-rotate'] : ''}/>
            :
            num
        }
      </div>
      
      <div 
        className={[style.top, isRotate ? style['top-open'] : ''].join(' ')}
        onClick={handleClickToTop}
      >
        <VerticalAlignTopOutlined />
      </div>
      <div
        className={[style.left, isRotate ? style['left-open'] : ''].join(' ')}
        onClick={handleClickOpen}
      >
        <PoweroffOutlined />
      </div>
      <div
        className={[style.bottom, isRotate ? style['bottom-open'] : ''].join(' ')}
        onClick={handleClickToBottom}
      >
        <VerticalAlignBottomOutlined />
      </div>
    </div>
  )
}
