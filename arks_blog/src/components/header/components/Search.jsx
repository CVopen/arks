import style from '../index.module.scss'
import { SearchOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useState, useRef } from 'react'
export default function Header(props) {
  const { show, changeStata } = props
  const [ text, setText ] = useState('')

  const inputRef = useRef()

  const onSearch = () => {
    console.log(text)
    changeStata()
    setText('')
    inputRef.current.value = ''
  }

  const inputKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSearch()
    }
    setText(e.target.value)
  }

  const inputChange = (e) => {
    setText(e.target.value)
  }

  return (
    <div className={[style.modal, show ? style['modal-open'] : ''].join(' ')}>
      <div className={style.search}>
        <input 
          type="text" 
          placeholder="search" 
          onKeyDown={inputKeyDown}
          onChange={inputChange}
          ref={inputRef}
        />
        <Button 
          onClick={onSearch}
          icon={<SearchOutlined />}
        />
      </div>
    </div>
  )
}