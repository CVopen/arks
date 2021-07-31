import style from './index.module.scss'
import { DoubleLeftOutlined } from '@ant-design/icons'
import { useRef, Fragment, useEffect, useState } from 'react'
import bus from '../../utils/bus'
export default function MaskImg(props) {
  let timer = useRef()
  const [ width, setWidth ] = useState(document.body.offsetWidth > 1000)
  useEffect(() => {
    console.log(bus);
    bus.on('offsetWidth', (flag) => setWidth(flag > 1000))
    return componentWillUnmount
  }, [])
  const handleClickToBottom = () => {
    clearInterval(timer.current)
    const innerHeight = document.body.offsetHeight  // 视口高度
    const bodyHeight = document.body.scrollHeight // 页面总高
    const result = bodyHeight - innerHeight > innerHeight ? innerHeight : bodyHeight - innerHeight
    const speed = (result - 60 - (document.documentElement.scrollTop || document.body.scrollTop)) / 12.5
    timer.current = setInterval(() => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 滚动高度
      if (scrollTop + speed < result - 60) {
        document.body.scrollTop = scrollTop + speed
      } else {
        document.body.scrollTop = result - 60
        clearInterval(timer.current)
      }
    }, 20)
  }

  const componentWillUnmount = () => {
    bus._events.offsetWidth.pop()
  }

  return (
    <div 
      className={style.mask}
      style={{height: props.height ? '65vh' : window.innerHeight}}
    >
      <img 
        src={props.src} 
        alt="a" 
      />
      <div className={style.maskCom} style={{height: props.height ? '65vh' : window.innerHeight}}>
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