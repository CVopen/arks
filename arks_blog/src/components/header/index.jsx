import style from './index.module.scss'
import { SearchOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { useLocation, withRouter } from 'react-router-dom'
import Search from './components/Search'
import bus from '../../utils/bus'
function Header(props) {
  const [ isRotate, setRotate ] = useState(false)
  const [ isSearch, setSearch ] = useState(false)
  const [ color, setColor ] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => {
    bus.on('scrollTop', (top) => setColor(top > 0))
  }, [])

  // 路由跳转
  const toPath = (path) => {
    return () => {
      if (pathname === path) return
      props.history.push(path)
    }
  }

  return (
    <div className={[style.header, color ? style['header-open'] : ''].join(' ')}>
      <div className={[style.btn, isRotate ? style['btn-rotate'] : ''].join(' ')} onClick={() => setRotate(!isRotate)}>
        <span className={style.line}></span>
      </div>
      <div className={[style.nav, isRotate ? style['nav-open'] : ''].join(' ')}>
        <ul>
          <li>
            <span onClick={toPath('/')}>首页</span>
          </li>
          <li>
            <span onClick={toPath('/login')}>分类</span>
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
      <img 
        className={[style.logo, isRotate ? style['logo-open'] : ''].join(' ')} 
        src={require('../../assets/images/logo.jpg').default} alt="logo"
        onClick={toPath('/center')}
      />
      <Search show={isSearch} changeStata={() => setSearch(false)} />
    </div>
  )
}

export default withRouter(Header)