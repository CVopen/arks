import style from './index.module.scss'
import { useState, useEffect } from 'react'
import { useLocation, withRouter } from 'react-router-dom'
import Search from './components/Search'
import bus from '../../utils/bus'
import NavPc from './components/NavPc'
import NavMoblie from './components/NavMoblie'
function Header(props) {
  const [ isRotate, setRotate ] = useState(false)
  const [ isSearch, setSearch ] = useState(false)
  const [ color, setColor ] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => {
    bus.on('scrollTop', (top) => setColor(top > 0))
  }, [])

  // 路由跳转
  const toPath = () => {
    if (pathname === '/center' || isRotate) return
    props.history.push('/center')
  }
  
  const path = [
    {
      path: '/',
      name: '首页'
    },
    {
      path: '/login',
      name: '分类'
    },
    {
      path: '/',
      name: '标签'
    },
    {
      path: '/',
      name: '归档'
    },
    {
      path: '/',
      name: '友链'
    },
    {
      path: '/',
      name: '客户端'
    }
  ]

  return (
    <div className={[style.header, color ? style['header-open'] : ''].join(' ')}>
      <div className={[style.btn, isRotate ? style['btn-rotate'] : ''].join(' ')} onClick={() => setRotate(!isRotate)}>
        <span className={style.line}></span>
      </div>
      {
        // 视口高度
        document.body.offsetWidth > 1000 ?
        <NavPc 
          isRotate={isRotate}
          isSearch={isSearch}
          path={path}
          setSearch={setSearch}
          push={props.history.push}
          pathname={pathname}
        /> : 
        <NavMoblie 
          isRotate={isRotate}
          isSearch={isSearch}
          path={path}
          setSearch={setSearch}
          push={props.history.push}
          pathname={pathname}
          setRotate={setRotate}
        />
      }
      <img 
        className={[style.logo, isRotate ? style['logo-open'] : ''].join(' ')} 
        src={require('../../assets/images/logo.jpg').default} alt="logo"
        onClick={toPath}
      />
      <Search show={isSearch} changeStata={() => setSearch(false)} />
    </div>
  )
}

export default withRouter(Header)