/* eslint-disable react-hooks/exhaustive-deps */
import { Input } from 'antd'
import style from './index.module.scss'
import { CloseOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { useRef, useState, useEffect } from 'react'
export default function InputCom (props) {
  const [ showPwd, setShowPwd ] = useState(false)
  const [ typeInput, typeInputChange ] = useState('text')
  useEffect(() => {
    if (props.type) typeInputChange(props.type)
  }, [])
  const inputRef = useRef()
  const changeInput = (e) => {
    props.onChange(e.target.value)
  }

  const clear = () => {
    props.onChange('')
    inputRef.current.input.value = ''
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
        ref={inputRef}
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