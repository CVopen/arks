import style from './index.module.scss'
import { useState, useEffect } from 'react'
import { useLocation, withRouter } from 'react-router-dom'
import Search from './components/Search'
import bus from '../../utils/bus'
import NavPc from './components/NavPc'
import NavMoblie from './components/NavMoblie'
import { useSelector } from 'react-redux'
import { 
  HomeOutlined,
  FolderOutlined,
  TagsOutlined,
  ContainerOutlined,
  LinkOutlined,
  SendOutlined
 } from '@ant-design/icons'

function Header(props) {
  const [ isRotate, setRotate ] = useState(false)
  const [ isSearch, setSearch ] = useState(false)
  const [ color, setColor ] = useState(false)
  const [ width, setWidth ] = useState(document.body.offsetWidth > 1400)
  const { pathname } = useLocation()
  const store = useSelector((store) => store.user.userInfo)
  
  useEffect(() => {
    bus.on('offsetWidth', (flag) => {
      setWidth(flag > 1400)
      setSearch(flag <= 1400 ? false : isSearch)
    })
    bus.on('scrollTop', (top) => setColor(top > 0))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 路由跳转
  const toPath = () => {
    if (pathname === '/center' || isRotate) return
    props.history.push('/center')
  }
  
  const path = [
    {
      path: '/',
      name: '首页',
      icon: <HomeOutlined /> 
    },
    {
      path: '/user/login',
      name: '分类',
      icon: <FolderOutlined />
    },
    {
      path: '/test',
      name: '标签',
      icon: <TagsOutlined />
    },
    {
      path: '/',
      name: '归档',
      icon: <ContainerOutlined /> 
    },
    {
      path: '/',
      name: '友链',
      icon: <LinkOutlined />
    },
    {
      path: '/',
      name: '客户端',
      icon: <SendOutlined />
    }
  ]

  return (
    <div className={[style.header, color ? style['header-open'] : ''].join(' ')}>
      <div className={[style.btn, isRotate ? style['btn-rotate'] : ''].join(' ')} onClick={() => setRotate(!isRotate)}>
        <span className={style.line}></span>
      </div>
      {
        // 视口高度
        width ?
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
          path={path}
          push={props.history.push}
          pathname={pathname}
          setRotate={setRotate}
        />
      }
      <img 
        className={[style.logo, isRotate ? style['logo-open'] : ''].join(' ')} 
        src={store.userImg} 
        alt="logo"
        onClick={toPath}
      />
      <Search show={isSearch} changeStata={() => setSearch(false)} />
    </div>
  )
}

export default withRouter(Header)
