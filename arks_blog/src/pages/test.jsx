import './test.scss'
import { useDispatch, useSelector, useStore } from 'react-redux'

export default function Test () {
  const store = useSelector((store) => store.app)
  const storeUser = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const userInfo = window.localStorage.getItem('userInfo')
  dispatch({type: 'SET_USERINFO', value: JSON.parse(userInfo)})
  console.log(useStore().getState());
  return (
    <div className="test">
      {store.num}
      <button onClick={() => dispatch({type: 'add', value:1})}>增加</button>
      <img src={storeUser.userInfo.userImg} alt="" />
    </div>
  )
}