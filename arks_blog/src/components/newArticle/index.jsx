/* eslint-disable jsx-a11y/anchor-is-valid */
// import { useSelector, useDispatch } from 'react-redux'
import { Card } from 'antd'
import { ScheduleOutlined } from '@ant-design/icons'
import style from './index.module.scss'
import { useState, useEffect } from 'react'
import { getNewArticle } from '@/api/article'
import { formDate } from '@/utils/utils'
import { withRouter } from 'react-router-dom'
import { encodeQuery } from '@utils/RouterQuery'

function NewArticle(props) {

  const [ list, changeList ] = useState([])
  
  useEffect(() => {
    getList()
  }, [])

  const getList = () => {
    getNewArticle({ limit: 10 }).then(res => {
      changeList(res.data)
    })
  }

  const toDetails = id => {
    return () => {
      props.history.push({pathname:'/article_details', search: encodeQuery({ id })})
    }
  }

  return (
    <Card hoverable className="cart">
      <div className="text" style={{fontSize: '20px'}}>
        <ScheduleOutlined style={{color: '#ff7675'}}/> 最新文章
        {
          list.map(item => <div className={style.item} key={item.ID}>
            <a onClick={toDetails(item.ID)}>
              <img src={item.img} alt="" />
            </a>
            <div className={style.content}>
              <a onClick={toDetails(item.ID)}>{item.summary}</a>
              <span>{ formDate(item.CreatedAt, 'YYYY-MM-DD hh:mm:ss') }</span>
            </div>
          </div>)
        }
      </div>
    </Card>
  )
}
export default withRouter(NewArticle)