import style from './index.module.scss'
import { useEffect, useState } from 'react';

import InputCom from '../components/input'
import From from '../components/from'
import { getCaptcha, login } from '../../../api/auth'
function LoginCom() {
  const [ userInfo, setUserInfo ] = useState({})
  const [ tip, tipText ] = useState('')
  useEffect(() => {
    captcha()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const captcha = () => {
    getCaptcha().then(res => {
      setUserInfo({...userInfo , ...res.data})
    })
  }

  const userLogin = () => {
    if (!validate()) return
    login(userInfo).then(res => {
      console.log(res);
    }).catch(err => {
      captcha()
      throw err
    })
  }
  
  const inputChange = (type) => {
    return (e) => {
      tipText('')
      userInfo[type] = e
      setUserInfo({...userInfo})
    }
  }

  const validate = () => {
    const { username, password, captcha_val } = userInfo 
    if (!username || username.length < 3 || username.length > 30) {
      tipText('用户名输入有误')
      return false
    }
    if (!password || password.length < 3 || password.length > 20) {
      tipText('密码长度3-20位')
      return false
    }
    if (!captcha_val || captcha_val.length !== 4) {
      tipText('验证码长度为4位')
      return false
    }
    return true
  }

  return (
    <>
      <InputCom 
        onChange={inputChange('username')}
        type="text"
        placeholder="账号"
        clear
      />
      <InputCom 
        onChange={inputChange('password')}
        type="password"
        placeholder="密码"
      />
      <div className={style.code}>
        <div className={style.inputCode}>
          <InputCom 
            onChange={inputChange('captcha_val')}
            type="text"
            placeholder="验证码"
          />
        </div>
        <img src={userInfo.captcha_url}  onClick={captcha} alt="" />
      </div>
      <div className={style.tip}>{ tip }</div>
      <button onClick={userLogin}>登录</button>
    </>
  )
}

export default function LoginPage () {
  return (
    <From FromCom={LoginCom} title="登录" />
  )
}