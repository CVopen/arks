// import { useSelector, useDispatch } from 'react-redux'
import { Card } from 'antd'
import { ScheduleOutlined } from '@ant-design/icons'
import style from './index.module.scss'
import { useState, useEffect } from 'react'
import { getNewArticle } from '@/api/article'
import { formDate } from '@/utils/utils'

export default function NewArticle() {

  const [ list, changeList ] = useState([])
  
  useEffect(() => {
    getList()
  }, [])

  const getList = () => {
    getNewArticle({ limit: 10 }).then(res => {
      changeList(res.data)
    })
  }

  return (
    <Card hoverable className="cart">
      <div className="text" style={{fontSize: '20px'}}>
        <ScheduleOutlined style={{color: '#ff7675'}}/> 最新文章
        {
          list.map(item => <div className={style.item} key={item.ID}>
            <a href="#/center">
              <img src={item.img} alt="" />
            </a>
            <div className={style.content}>
              <a href="#/center">{item.summary}</a>
              <span>{ formDate(item.CreatedAt, 'YYYY-MM-DD hh:mm:ss') }</span>
            </div>
          </div>)
        }
      </div>
    </Card>
  )
}