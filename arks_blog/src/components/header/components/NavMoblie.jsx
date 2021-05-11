import style from './index.module.scss'
import { SearchOutlined } from '@ant-design/icons'
export default function NavPc(props) {
  const {
    isRotate,
    path,
    setSearch,
    isSearch,
    push,
    setRotate,
    pathname
  } = props
  const toPath = (e) => {
    const ev = e || window.event
    if (ev.target.dataset.path && pathname !== ev.target.dataset.path) {
      push(ev.target.dataset.path)
      setRotate(!isRotate)
      return
    }
    if (document.body.offsetWidth * .7 > ev.clientX) return
    setRotate(!isRotate)
  }
  return (
    <div 
      className={[style.nav, isRotate ? style['nav-open'] : ''].join(' ')}
      onClick={toPath}
    >
      <div className={style.img}>
        <img 
          className={style.logo} 
          src="http://zhizi-public.oss-cn-hangzhou.aliyuncs.com/20210511/f472a827fcfb5bf808ec12d08026ce24.png" 
          alt="logo"
        />
      </div>
      <ul>
        {
          path.map((item, index) => {
            return (
              <li key={index}>
                <span data-path={item.path}>{item.name}</span>
              </li>
            )
          })
        }
      </ul>
      <SearchOutlined onClick={() => setSearch(!isSearch)} style={{fontSize: '40px'}}/>
    </div>
  )
}