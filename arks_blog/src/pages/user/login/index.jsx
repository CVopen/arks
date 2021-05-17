import style from './index.module.scss'
import { useState } from 'react';
import { Row } from 'antd'
import InputCom from '../components/input'
import From from '../components/from'
import Btn from '../components/btn'
import Captcha from '../components/captcha'
import { login } from '@/api/auth'
import Storage from '@/utils/localStorage'
import { useDispatch } from 'react-redux'

export default function LoginCom(props) {
  const dispatch = useDispatch('user')
  const { history } = props
  const [ userInfo, setUserInfo ] = useState({})
  const [ tip, tipText ] = useState('')
  const captcha = (data) => {
    setUserInfo({...userInfo , ...data})
  }

  const userLogin = () => {
    if (!validate()) return
    login(userInfo).then(res => {
      Storage('set', 'userInfo', res.data)
      Storage('set', 'token', res.data.token)
      dispatch({type: 'SET_USERINFO', value: res.data})
      history.replace('/')
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
      tipText('用户名输入有误，长度为3~30位')
      return false
    }
    if (!password || password.length < 6 || password.length > 20) {
      tipText('密码长度6-20位')
      return false
    }
    if (!captcha_val || captcha_val.length !== 4) {
      tipText('验证码长度为4位')
      return false
    }
    return true
  }

  return (
    <From title="登录" history={history}>
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
      <Captcha 
        onChange={inputChange('captcha_val')}
        onRefresh={captcha}
      />
      <div className={style.tip}>{ tip }</div>
      <Btn onClick={userLogin} text='登录' />
      <Row justify="end">
        <span className={style.span} onClick={()=>history.push('/user/register')}>没有账号?</span>
        <span className={style.span} onClick={()=>history.push('/user/forget')}>忘记密码</span>
      </Row>
    </From>
  )
}
