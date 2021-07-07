/* eslint-disable react-hooks/exhaustive-deps */
import { Input } from 'antd'
import style from './index.module.scss'
import { CloseOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
export default function InputCom (props) {
  const [ showPwd, setShowPwd ] = useState(false)
  const [ textValue, setValue ] = useState('')
  const [ typeInput, typeInputChange ] = useState('text')
  useEffect(() => {
    if (props.type) typeInputChange(props.type)
  }, [])

  const changeInput = (e) => {
    props.onChange(props.ban ? e.target.value : e.target.value.replace(/[\u4e00-\u9fa5]/ig,''))
    setValue(props.ban ? e.target.value : e.target.value.replace(/[\u4e00-\u9fa5]/ig,''))
  }

  const clear = () => {
    props.onChange('')
    setValue('')
  }

  const changeType = () => {
    typeInputChange(showPwd ? 'password' : 'text')
    setShowPwd(!showPwd)
  }

  return (
    <div className={style.input}> 
      <Input 
        placeholder={props.placeholder}
        bordered={false}
        onChange={changeInput}
        type={typeInput}
        value={props.value === '' || props.value ? props.value : textValue}
      />
      <em className={style.line}>
      </em>
      {
        props.type === 'password' ? 
        <>
          {
            showPwd ? 
            <EyeOutlined onClick={changeType} /> : 
            <EyeInvisibleOutlined onClick={changeType} />
          }
        </> :
        props.clear && <CloseOutlined onClick={clear} /> 
      }
    </div>
  )
}