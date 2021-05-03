import style from './index.module.scss'
import { SearchOutlined } from '@ant-design/icons'
import { useState } from 'react'
import Search from './components/Search'
export default function Header() {
  const [ isAnimate, setAnimate ] = useState(false)
  const [ isRotate, setRotate ] = useState(false)
  const [ isSearch, setSearch ] = useState(false)
  const animationImg = () => {
    if (isAnimate) return
    setAnimate(true)
    setRotate(!isRotate)
    setTimeout(() => {
      setAnimate(false)
    }, 300)
  }


  return (
    <div className={style.header}>
      <div className={[style.btn, isRotate ? style['btn-rotate'] : ''].join(' ')} onClick={animationImg}>
        <span className={style.line}></span>
      </div>
      <div className={[style.nav, isRotate ? style['nav-open'] : ''].join(' ')}>
        <ul>
          <li>
            <span>首页</span>
          </li>
          <li>
            <span>分类</span>
          </li>
          <li>
            <span>标签</span>
          </li>
          <li>
            <span>归档</span>
          </li>
          <li>
            <span>友链</span>
          </li>
          <li>
            <span>客户端</span>
          </li>
        </ul>
        <SearchOutlined onClick={() => setSearch(!isSearch)} style={{fontSize: '40px'}}/>
      </div>
      <Search show={isSearch} changeStata={() => setSearch(false)} />
    </div>
  )
}