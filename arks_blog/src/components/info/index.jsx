import { useSelector, useDispatch } from 'react-redux'
import { Card } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import style from './index.module.scss'
import Storage from '@/utils/localStorage'

export default function Info(props) {
  const store = useSelector((store) => store.user.userInfo)
  const defaultInfo = useSelector((store) => store.user.defaultInfo)
  const dispatch = useDispatch()
  const signOut = () => {
    dispatch({type: 'SET_USERINFO', value: {}})
    Storage('remove', 'token')
    Storage('remove', 'userInfo')
  }

  return (
    <Card hoverable className="cart">
      <img 
        className={style.avatar} 
        src={store.userImg ? store.userImg : defaultInfo.userImg} 
        onClick={() => props.history.push('/center')} 
        alt="avatar" 
      />
  
      <div className="text" style={{fontSize: '24px', textAlign: 'center'}}>{store.nickName}</div>
      <div className="text" style={{textAlign: 'center',}}>{store.sign}</div>
      <div className={style.nums}>
        <div>
          <span>文章</span>
          <span>7</span>
        </div>
        <div>
          <span>文章</span>
          <span>7</span>
        </div>
        <div>
          <span>文章</span>
          <span>7</span>
        </div>
      </div>
      <div className={style.btn} onClick={() => window.open(store.github ? store.github : defaultInfo.github)}>
        <GithubOutlined style={{ fontSize: '18px' }} />
        <span>Follow Me</span>
      </div>
      {
        store.token && <div className={style.btn} onClick={signOut}>
          <span>sign out</span>
        </div>
      }
    </Card>
  )
}