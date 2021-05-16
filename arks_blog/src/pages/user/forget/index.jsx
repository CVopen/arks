import style from '../register/index.module.scss'
import { useState, useEffect } from 'react'
import { Row } from 'antd'
import Btn from '../components/btn'
import InputCom from '../components/input'
import From from '../components/from'
import { forgetPwd, editPwd } from '@/api/auth'
import Captcha from '../components/captcha'
import { message } from 'antd';

export default function ForgetCom(props) {
  const { history } = props
  return (
    <From title="修改密码" history={history}>
      <Forget history={history} />
    </From>
  )
}
function Forget (props) {
  const [ tip, tipText ] = useState('')
  const [ userInfo, setUserInfo ] = useState({})
  const [ fromArr, setArr ] = useState([])

  useEffect(() => {
    setArr([
      {
        placeholder: '用户名',
        inputType: 'username'
      },
      {
        placeholder: '邮箱',
        inputType: 'email'
      }
    ])
  }, [])

  const inputChange = (type) => {
    return (e) => {
      tipText('')
      userInfo[type] = e
      setUserInfo({...userInfo})
    }
  }

  const captcha = (data) => {
    setUserInfo({...userInfo , ...data})
  }
  
  

  const validate = () => {
    const { username, captcha_val, email } = userInfo 
    // eslint-disable-next-line no-useless-escape
    const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    if (!username || username.length < 3 || username.length > 30) {
      tipText('用户名输入有误，长度为3~30位')
      return false
    }
    if (!email || !reg.test(email)) {
      tipText('邮箱不正确')
    }
    if (!captcha_val || captcha_val.length !== 4) {
      tipText('验证码长度为4位')
      return false
    }
    return true
  }
  const validate2 = () => {
    const { password, second_pwd, captcha_val } = userInfo 
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
  const toLogin = () => props.history.push('/user/login')

  const forgetUser = () => {
    if (!validate()) return
    forgetPwd(userInfo).then(() => {
      setUserInfo({...userInfo , validate: true, captcha_val: ''})
      setArr([
        {
          placeholder: '密码',
          type: 'password',
          inputType: 'password'
        },
        {
          placeholder: '确认密码',
          type: 'password',
          inputType: 'second_pwd'
        }
      ])
    })
  }

  const edit = () => {
    if (!validate2()) return
    editPwd(userInfo).then((res) => {
      message.success(res.msg)
      // toLogin()
    })
  }
  return (
    <>
      {
        // 表单
        fromArr.map(item => (
          <InputCom 
            key={item.inputType}
            onChange={inputChange(item.inputType)}
            type={item.type}
            placeholder={item.placeholder}
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
      <Btn onClick={userInfo.validate ? edit : forgetUser} text='确定' />
      <Row justify="end">
        <span className={style.span} onClick={toLogin}>直接登录</span>
      </Row>
    </>
  )
}