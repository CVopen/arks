import style from './index.module.scss'
import { useEffect, useRef, useState } from 'react'
import { DoubleLeftOutlined } from '@ant-design/icons'
import Storage from '@/utils/localStorage'
import { useDispatch } from 'react-redux'

export default function Typing(props) {
  let timer = useRef()
  const [ text, setText ] = useState([])
  const defaultTextTwo = 'hello world'.split('')
  const defaultTextOwn = '您的指尖能够改变世界!'.split('')
  const dispatch = useDispatch('user')

  useEffect(() => {
    showInput(defaultTextOwn)
    const info = Storage('get', 'userInfo')
    if (info) dispatch({type: 'SET_USERINFO', value: JSON.parse(info)})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showInput = (defaultText) => {
    timer.current = setInterval(() => {
      if (text.length === defaultText.length) {
        clearInterval(timer.current)
        setTimeout(() => defaultText === defaultTextOwn && showOutput(defaultText), 1000)
        return
      }
      text.push(defaultText[text.length])
      setText([].concat(text))
    }, 400)
  }
  const showOutput = (defaultText) => {
    timer.current = setInterval(() => {
      if (!text.length) {
        clearInterval(timer.current)
        defaultText === defaultTextOwn && showInput(defaultTextTwo)
        return
      }
      text.pop(defaultText[text.length])
      setText([].concat(text))
    }, 100)
  }

  const toPath = () => {
    clearInterval(timer.current)
    props.setShow(true)
  }
  return (
    <div className={style.typing} style={{height: window.innerHeight}}>
      <div className={style.mask} style={{height: window.innerHeight}}>
        <span 
          onClick={toPath}
          className={style.texts}
        >
          {text}
        </span>
        <DoubleLeftOutlined
          onClick={toPath} 
          className={style.path}
        />
      </div>
    </div>
  )
}