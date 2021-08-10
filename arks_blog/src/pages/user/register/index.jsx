import style from './index.module.scss'
import { useState } from 'react'
import { Row } from 'antd'
import Btn from '../components/btn'
import InputCom from '../components/input'
import From from '../components/from'
import { register } from '../../../api/auth'
import Captcha from '../components/captcha'
import { message } from 'antd';

export default function RegisterCom(props) {
  const { history } = props
  const [ tip, tipText ] = useState('')
  const [ userInfo, setUserInfo ] = useState({})

  const inputChange = (type) => (e) => {
    tipText('')
    userInfo[type] = e
    setUserInfo({...userInfo})
  }

  const captcha = (data) => setUserInfo({...userInfo , ...data})
  
  const fromArr = [
    { placeholder: '用户名', inputType: 'username' },
    { placeholder: '邮箱', inputType: 'email' },
    { placeholder: '昵称', inputType: 'nickname', ban: true },
    { placeholder: '密码', type: 'password', inputType: 'password' },
    { placeholder: '确认密码', type: 'password', inputType: 'second_pwd' }
  ]

  const validate = () => {
    const { username, password, second_pwd, captcha_val, email, nickname } = userInfo 
    // eslint-disable-next-line no-useless-escape
    const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    if (!username || username.length < 3 || username.length > 30) {
      tipText('用户名输入有误，长度为3~30位')
      return false
    }
    if (!email || !reg.test(email)) {
      tipText('邮箱不正确')
    }
    if (!nickname || nickname.length < 1 || nickname.length > 20) {
      tipText('昵称输入有误，长度为1~20位')
      return false
    }
    if (!password || password.length < 6 || password.length > 20) {
      tipText('密码长度6-20位')
      return false
    }
    if (password !== second_pwd) {
      tipText('两次密码不一致')
      return false
    }
    if (!captcha_val || captcha_val.length !== 4) {
      tipText('验证码长度为4位')
      return false
    }
    return true
  }
  const toLogin = () => history.push('/login')

  const userRegister = () => {
    if (!validate()) return
    register(userInfo).then(res => {
      message.success(res.msg)
      toLogin()
    }).catch(() => {
      inputChange('captcha_val')('')
    })
  }
  return (
    <From title="注册" history={history}>
      {
        // 表单
        fromArr.map((item, index) => (
          <InputCom 
            key={index}
            onChange={inputChange(item.inputType)}
            type={item.type}
            placeholder={item.placeholder}
            ban={item.ban}
            clear
          />
        ))
      }
      <Captcha 
        onChange={inputChange('captcha_val')}
        onRefresh={captcha}
        value={userInfo.captcha_val}
      />
      <div className={style.tip}>{ tip }</div>
      <Btn onClick={userRegister} text='注册' />
      <Row justify="end">
        <span className={style.span} onClick={toLogin}>已有账号</span>
      </Row>
    </From>
  )
}