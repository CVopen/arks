import style from './index.module.scss'
import { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Search from './components/Search'
import bus from '../../utils/bus'
import NavPc from './components/NavPc'
import NavMoblie from './components/NavMoblie'
import { useSelector } from 'react-redux'
import { 
  HomeOutlined,
  FolderOutlined,
  TagsOutlined,
  ToolOutlined,
  LinkOutlined,
  // SendOutlined
} from '@ant-design/icons'
import Tmerminal from '../terminal/index.jsx'

function Header(props) {
  const [ isRotate, setRotate ] = useState(false)
  const [ isSearch, setSearch ] = useState(false)
  const [ color, setColor ] = useState(false)
  const [ isShow, setShow ] = useState(false)
  const [ width, setWidth ] = useState(document.body.offsetWidth > 1400)
  const store = useSelector((store) => store.user.userInfo)
  const defaultInfo = useSelector((store) => store.user.defaultInfo)
  useEffect(() => {
    bus.on('offsetWidth', (flag) => {
      setWidth(flag > 1400)
      setSearch(flag <= 1400 ? false : isSearch)
    })
    bus.on('scrollTop', (top) => {
      if (pathnameEnv() !== '/404' && pathnameEnv() !== '/center') {
        setColor(top > 0)
      }
      if (pathnameEnv() === '/404' || pathnameEnv() === '/center') {
        setColor(true)
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 路由跳转
  const toPath = () => {
    if (pathnameEnv() === '/center' || isRotate) return
    props.history.push('/center')
  }

  const pathnameEnv = () => {
    if (process.env.NODE_ENV === 'development') {
      return window.location.pathname
    }
    return window.location.pathname.slice(4)
  }
  
  const path = [
    { path: '/', name: '首页', icon: <HomeOutlined /> },
    { path: '/category', name: '分类', icon: <FolderOutlined /> },
    { path: '/tag', name: '标签', icon: <TagsOutlined /> },
    { path: '/tools', name: '工具', icon: <ToolOutlined /> },
    { path: '/friends', name: '友链', icon: <LinkOutlined /> },
    // { path: '/', name: '客户端', icon: <SendOutlined /> }
  ]

  const changeTmerinal = () => {
    if (isShow) return toPath()
    setShow(!isShow)
  }

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
          pathname={pathnameEnv()}
        /> : 
        <NavMoblie 
          isRotate={isRotate}
          path={path}
          push={props.history.push}
          pathname={pathnameEnv()}
          setRotate={setRotate}
        />
      }
      <img 
        className={[style.logo, isRotate ? style['logo-open'] : ''].join(' ')} 
        src={store.userImg ? store.userImg : defaultInfo.userImg} 
        alt="logo"
        onClick={changeTmerinal}
      />
      {
        isShow && document.body.clientWidth > 1400 && <Tmerminal change={setShow} />
      }
      <Search show={isSearch} style={{color: '#fff'}} changeStata={() => setSearch(false)} />
    </div>
  )
}

export default withRouter(Header)
