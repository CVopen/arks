import style from './index.module.scss'
import { DoubleLeftOutlined } from '@ant-design/icons'
import { useRef, Fragment, useEffect, useState } from 'react'
import bus from '../../utils/bus'
export default function MaskImg(props) {
  let timer = useRef()
  const [ width, setWidth ] = useState(document.body.offsetWidth > 1000)
  useEffect(() => {
    bus.on('offsetWidth', (flag) => setWidth(flag > 1000))
  }, [])
  const handleClickToBottom = () => {
    clearInterval(timer.current)
    const innerHeight = document.body.offsetHeight  // 视口高度
    const bodyHeight = document.body.scrollHeight // 页面总高
    const result = bodyHeight - innerHeight > innerHeight ? innerHeight : bodyHeight - innerHeight
    const speed = (result - (document.documentElement.scrollTop || document.body.scrollTop)) / 12.5
    timer.current = setInterval(() => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 滚动高度
      if (scrollTop + speed < result) {
        window.scrollTo(0, scrollTop + speed)
      } else {
        window.scrollTo(0, result)
        clearInterval(timer.current)
      }
    }, 20)
  }
  return (
    <div 
      className={style.mask}
      style={{height: props.height ? '65vh' : '100vh'}}
    >
      <img 
        src="http://zhizi-public.oss-cn-hangzhou.aliyuncs.com/20210505/4bed66f04b0006858803b90eb66dd0a2.jpg" 
        alt="a" 
        style={{height: props.height ? '65vh' : '100vh'}}
      />
      <div className={style.maskCom}>
        {
          props.height ? 
            <h2 style={{fontSize: width ? '50px' : '.7rem'}}>{props.text}</h2> :
            <>
              <h2>ark</h2>
              <DoubleLeftOutlined onClick={handleClickToBottom} />
            </>
        }
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