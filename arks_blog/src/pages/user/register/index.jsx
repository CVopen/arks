import style from './index.module.scss'
// import { useEffect, useState } from 'react'

import InputCom from '../components/input'
import From from '../components/from'
// import { getCaptcha, login } from '../../../api/auth'
export default function RegisterCom() {
  return (
    <From FromCom={Register} title="注册" />
  )
}
function Register () {

  const inputChange = (type) => {
    return (e) => {}
  }

  const fromArr = [
    {
      placeholder: '用户名',
      inputType: 'username'
    },
    {
      placeholder: '邮箱',
      inputType: 'email'
    },
    {
      placeholder: '昵称',
      inputType: 'nickname'
    },
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
  ]
  return (
    <>
      {
        // 表单
        fromArr.map((item, index) => (
          <InputCom 
            key={index}
            onChange={inputChange(item.type)}
            type={item.type}
            placeholder={item.placeholder}
            clear
          />
        ))
      }
    </>
  )
}