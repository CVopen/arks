/* eslint-disable react-hooks/exhaustive-deps */
import style from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import Storage from '@/utils/localStorage'
import { Tabs } from 'antd';
import Empty from './components/empty/index'
import {
  getOpinion,
  getHistoryList,
  getArticleList
} from '@/api/center'
import Opinion from './components/opinion/index'
import History from './components/history/index'
import Article from './components/article/index'
import { useState, useEffect, createContext } from 'react'
import bus from '@/utils/bus'
const { TabPane } = Tabs;

export const HistoryContext = createContext();

export default function Center (props) {
  const storeUser = useSelector((store) => store.user.userInfo)
  const dispatch = useDispatch()

  // 意见数据
  const [opinionList, changeOpinionList] = useState({ complete: [], hang : [] })
  // 历史记录
  const [historyList, changeHistoryList] = useState({ page: 1 })
  // 我的文章
  const [articleList, changeArticleList] = useState({ page: 1 })
  // key
  const [key, changeKey] = useState(1)
  

  useEffect(() => {
    bus.on('scrollTop', comNum())
    if (articleList.page === 1) article()
    return () => bus._events.scrollTop.pop()
  }, [opinionList, historyList, articleList])

  // 计算
  const comNum = () => {
    let timer = null
    return top => {
      const scrollheight = document.body.scrollHeight // 页面总高
      const innerHeight = document.body.offsetHeight  // 视口高度
      if ((scrollheight - top - innerHeight) < 200) {
        if (timer) return
        timer = setTimeout(() => {
          switch (key) {
            case 1:
              article()
              break;
            case 2:
              history()
              break;
            default:
              break;
          }
          timer = null
        }, 200)
      }
    }
  }

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

  const history = () => {
    if (!historyList.lastMore && historyList.page !== 1) return
    getHistoryList({ page: historyList.page, pageSize: 8 }).then(res => {
      if (historyList.page === 1) {
        changeHistoryList(Object.assign({}, res.data, { page: res.data.page + 1}))
      } else {
        historyList.data.earlier = [...historyList.data.earlier, ...res.data.data.earlier]
        historyList.lastMore = res.data.lastMore
        historyList.total = res.data.total
        historyList.page = res.data.page + 1
        changeHistoryList(Object.assign({}, historyList))
      }
    })
  }

  const article = () => {
    if (!articleList.lastMore && articleList.page !== 1) return
    getArticleList({ page: articleList.page}).then(res => {
      if (articleList.page === 1) {
        changeArticleList(Object.assign({}, res.data, { page: res.data.page + 1}))
      } else {
        articleList.data = [...articleList.data, ...res.data.data]
        articleList.page = res.data.page + 1
        articleList.lastMore = res.data.lastMore
        articleList.total = res.data.total
        changeArticleList(Object.assign({}, articleList))
      }
    })
  }

  const tagList = [
    { key: 1, title: '我的文章', com: <Article list={articleList} />},
    { key: 2, title: '历史浏览', com: <History data={historyList} changeList={changeHistoryList} />},
    { key: 3, title: '我的评论', com: ''},
    { key: 4, title: '意见反馈', com: <Opinion list={opinionList} getList={opinion} />},
    { key: 5, title: '文章数据', com: ''},
  ]

  const callback = (key) => {
    changeKey(key)
    switch (key) {
      case "1":
        return
      case "2":
        history()
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
        <HistoryContext.Provider value={props.history}>
          <Tabs defaultActiveKey="1" onChange={callback}>
            {
              tagList.map(item => (
                <TabPane tab={item.title} key={item.key}>
                  { item.com ? item.com : <Empty tab={item.key} /> }
                </TabPane>
              ))
            }
          </Tabs>
        </HistoryContext.Provider>
      </div>
    </div>
  )
}
