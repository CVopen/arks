import style from './index.module.scss'
import { useState, useEffect, useRef } from 'react'
import { 
  ArrowDownOutlined, 
  ArrowUpOutlined, 
  BulbOutlined, 
  MoreOutlined 
} from '@ant-design/icons'
import bus from '../../utils/bus'
import Storage from '@/utils/localStorage'

export default function Back() {
  useEffect(() => {
    bus.on('scrollTop', comNum)
  }, [])
  const [ num, setNum ] = useState(0)
  const [ isRotate, setRotate ] = useState(false)
  let timer = useRef()
  const scrollheight = document.body.scrollHeight // 页面总高
  const innerHeight = document.body.offsetHeight  // 视口高度
  const scrollTopAll = scrollheight - innerHeight  // 视口高度

  const handleClickToTop = () => {
    clearInterval(timer.current)
    const speed = (document.documentElement.scrollTop || document.body.scrollTop) / 50
    timer.current = setInterval(() => {
      setRotate(!isRotate)
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 滚动高度
      if (scrollTop - speed > 0) {
        document.body.scrollTop = scrollTop - speed
      } else {
        document.body.scrollTop = 0
        clearInterval(timer.current)
      }
    }, 20)
  }

  const handleClickToBottom = () => {
    clearInterval(timer.current)
    const speed = (scrollTopAll - (document.documentElement.scrollTop || document.body.scrollTop)) / 50
    timer.current = setInterval(() => {
      setRotate(!isRotate)
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 滚动高度
      if (scrollTop + speed < scrollTopAll) {
        document.body.scrollTop = scrollTop + speed
      } else {
        document.body.scrollTop = scrollheight
        clearInterval(timer.current)
      }
    }, 20)
  }

  const handleClickOpen = () => {
    const style = document.getElementsByTagName('body')[0].style
    let color = '#fff'
    if (style.getPropertyValue('--theme-colorbg') === '#fff') color = '#000'
    style.setProperty('--theme-colorbg', color)
    style.setProperty('--theme-fontColor', color === '#fff' ? '#000' : '#fff')
    Storage('set', 'theme', { colorbg: color, fontColor: color === '#fff' ? '#000' : '#fff' })
    setRotate(!isRotate)
  }
  // 计算
  const comNum = (top) => {
    const scrollheight = document.body.scrollHeight // 页面总高
    const innerHeight = document.body.offsetHeight  // 视口高度
    const result = top / (scrollheight - innerHeight)
    // eslint-disable-next-line use-isnan
    setNum((result === NaN || result === Infinity || !result) ? 0 : parseInt(result * 100) + '%')
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
        <ArrowUpOutlined />
      </div>
      <div
        className={[style.left, isRotate ? style['left-open'] : ''].join(' ')}
        onClick={handleClickOpen}
      >
        <BulbOutlined />
      </div>
      <div
        className={[style.bottom, isRotate ? style['bottom-open'] : ''].join(' ')}
        onClick={handleClickToBottom}
      >
        <ArrowDownOutlined />
      </div>
    </div>
  )
}
