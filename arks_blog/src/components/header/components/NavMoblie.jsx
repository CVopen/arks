import style from './index.module.scss'
import { useSelector } from 'react-redux'
import { Input } from 'antd'
import { ScissorOutlined } from '@ant-design/icons'

export default function NavPc(props) {
  const {
    isRotate,
    path,
    push,
    setRotate,
    pathname
  } = props

  const avatar = useSelector((state) => state.user.userInfo.userImg)

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
          src={avatar ? avatar : 'http://zhizi-public.oss-cn-hangzhou.aliyuncs.com/20210511/f472a827fcfb5bf808ec12d08026ce24.png'}
          alt="logo"
        />
      </div>
      <div className={style.inputbox}>
        <Input className={style.input} bordered={false} placeholder="search" />
      </div>
      <ul>
        <ScissorOutlined className={style.scissor} />
        {
          path.map((item, index) => {
            return (
              <li key={index}>
                {item.icon} <span style={{marginRight: 0}} data-path={item.path}>{item.name}</span>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}