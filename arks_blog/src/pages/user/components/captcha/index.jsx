import style from './index.module.scss'
import { getCaptcha } from '../../../../api/auth'
import InputCom from '../input/index'
import { useState, useEffect } from 'react'
export default function Btn(props) {
  const [ captchaData, setData ] = useState('')
  useEffect(() => {
    captcha()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const captcha = () => {
    getCaptcha().then(res => {
      setData(res.data)
      props.onRefresh(res.data)
    })
  }
  return (
    <div className={style.code}>
      <div className={style.inputCode}>
        <InputCom 
          onChange={props.onChange}
          type="text"
          placeholder="验证码"
        />
      </div>
      <img src={captchaData.captcha_url}  onClick={captcha} alt="刷新" />
    </div>
  )
}