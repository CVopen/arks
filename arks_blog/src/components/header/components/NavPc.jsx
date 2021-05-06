import style from '../index.module.scss'
import { SearchOutlined } from '@ant-design/icons'
export default function NavPc(props) {
  const {
    isRotate,
    path,
    setSearch,
    isSearch,
    push
  } = props
  const toPath = (e) => {
    const ev = e || window.event
    push(ev.target.dataset.path)
  }
  return (
    <div 
      className={[style.nav, isRotate ? style['nav-open'] : ''].join(' ')}
      onClick={toPath}
    >
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