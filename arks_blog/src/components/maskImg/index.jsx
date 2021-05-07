import style from './index.module.scss'
import { DoubleLeftOutlined } from '@ant-design/icons'
import { useRef, Fragment, useEffect, useState } from 'react'
import bus from '../../utils/bus'
export default function MaskImg() {
  let timer = useRef()
  const [ width, setWidth ] = useState(true)
  useEffect(() => {
    bus.on('offsetWidth', (flag) => setWidth(flag))
  }, [])
  const handleClickToBottom = () => {
    clearInterval(timer.current)
    const innerHeight = document.body.offsetHeight  // 视口高度
    const speed = (innerHeight - (document.documentElement.scrollTop || document.body.scrollTop)) / 12.5
    timer.current = setInterval(() => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 滚动高度
      if (scrollTop + speed < innerHeight) {
        window.scrollTo(0, scrollTop + speed)
      } else {
        window.scrollTo(0, innerHeight)
        clearInterval(timer.current)
      }
    }, 20)
  }

  return (
    <div className={style.mask}>
      <img src="http://zhizi-public.oss-cn-hangzhou.aliyuncs.com/20210505/4bed66f04b0006858803b90eb66dd0a2.jpg" alt="a" />
      <div className={style.maskCom}>
        <h2>ark</h2>
        <DoubleLeftOutlined onClick={handleClickToBottom} />
        {
          width && 
          <Fragment >
            <div className={style.auraOwn}></div>
            <div className={style.auraTwo}></div>
            <div className={style.auraThree}></div>
          </Fragment>
        }
      </div>
    </div>
  )
}