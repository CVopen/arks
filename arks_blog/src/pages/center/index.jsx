/* eslint-disable react-hooks/exhaustive-deps */
import style from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import Storage from '@/utils/localStorage'
import { Tabs } from 'antd';
import Empty from './components/empty/index'
import {
  getOpinion
} from '@/api/center'
import Opinion from './components/opinion/index'
import { useState } from 'react'
const { TabPane } = Tabs;

export default function Center (props) {
  const storeUser = useSelector((store) => store.user.userInfo)
  const dispatch = useDispatch()
  const [opinionList, changeOpinionList] = useState({ complete: [], hang : [] })

  const signOut = () => {
    dispatch({type: 'SET_USERINFO', value: {}})
    Storage('remove', 'token')
    Storage('remove', 'userInfo')
    props.history.replace('/')
  }

  const opinion = () => {
    getOpinion().then(res => {
      const opinion = { complete: [], hang : [] }
      res.data.forEach(item => {
        if (item.state === 3) {
          opinion.complete.push(item)
        } else {
          opinion.hang.push(item)
        }
        item.images = item.images.split(";")
      })
      changeOpinionList(opinion)
    })
  }

  const tagList = [
    { key: 1, title: '我的文章', com: ''},
    { key: 2, title: '历史浏览', com: ''},
    { key: 3, title: '我的评论', com: ''},
    { key: 4, title: '意见反馈', com: <Opinion list={opinionList} getList={opinion} />},
    { key: 5, title: '文章数据', com: ''},
  ]

  const callback = (key) => {
    switch (key) {
      case "1":
        return
      case "2":
        return
      case "3":
        return
      case "4":
        opinion()
        return
      case "5":
        return
      default:
        return
    }
  }

  return (
    <div className={style.center}>
      <div className="content" style={{display: 'block'}}>
        <div className={style.header}>
          <div className={style.top}>{storeUser.nickName}</div>
          <div className={style.bottom}>
            <p className='twoEllipsis'>{storeUser.sign}</p>
            <div>
              <span onClick={signOut}>退出登录</span>
              <span onClick={()=>window.open('http://101.132.192.93/admin')}>进入后台</span>
              <span>编辑资料</span>
            </div>
          </div>
          <div className={style.avatar}>
            <img src={storeUser.userImg} alt="avatar" />
          </div>
        </div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          {
            tagList.map(item => (
              <TabPane tab={item.title} key={item.key}>
                {
                  item.com ? item.com : <Empty tab={item.key} />
                }
              </TabPane>
            ))
          }
        </Tabs>
      </div>
    </div>
  )
}
