import style from './index.module.scss'
import { useEffect, useRef, useState } from 'react'
import { DoubleLeftOutlined } from '@ant-design/icons'
import Storage from '@/utils/localStorage'
import { useDispatch } from 'react-redux'
import { refresh } from '@/api/auth'
import { getConfig } from '../../api'

export default function Typing(props) {
  let timer = useRef()
  const [ text, setText ] = useState([])
  const defaultTextTwo = 'hello world'.split('')
  const defaultTextOwn = '您的指尖能够改变世界!'.split('')
  const dispatch = useDispatch('user')
  const dispatchApp = useDispatch('app')

  useEffect(() => {
    showInput(defaultTextOwn)
    initTheme()
    reduxInfo()
    configSet()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const reduxInfo =() => {
    const info = Storage('get', 'userInfo')
    if (info) {
      refresh().then(res => {
        const value = JSON.parse(info)
        value.token = res.data.token
        Storage('set', 'userInfo', value)
        Storage('set', 'token', res.data.token)
        dispatch({type: 'SET_USERINFO', value })
      })
    }
  }

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

  const initTheme = () => {
    const style = document.getElementsByTagName('body')[0].style
    let theme = Storage('get', 'theme')
    if (!theme) {
      style.setProperty('--theme-colorbg', '#fff')
      style.setProperty('--theme-fontColor', '#000')
      theme = {
        colorbg: '#fff',
        fontColor: '#000',
      }
      Storage('set', 'theme', theme)
      return
    }
    theme = JSON.parse(theme)
    style.setProperty('--theme-colorbg', theme.colorbg)
    style.setProperty('--theme-fontColor', theme.fontColor)
  }

  const configSet = () => {
    getConfig().then(res => {
      dispatchApp({type: 'SET_CONFIG', value :res.data })
    })
  }

  return (
    <div className={style.typing}>
      <div className={style.mask}>
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