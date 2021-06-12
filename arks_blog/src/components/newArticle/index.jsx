// import { useSelector, useDispatch } from 'react-redux'
import { Card } from 'antd'
import { ScheduleOutlined } from '@ant-design/icons'
import style from './index.module.scss'

export default function NewArticle(props) {
  
  return (
    <Card hoverable className="cart">
      <div className="text" style={{fontSize: '20px'}}>
        <ScheduleOutlined style={{color: '#ff7675'}}/> 最新文章
        <div className={style.item}>
          <a href="#/center">
            <img src="https://cdn.jsdelivr.net/npm/butterfly-extsrc@1/img/default.jpg" alt="" />
          </a>
          <div className={style.content}>
            <a href="#/center">基于Vue Element的后台Element的后台Element的后台Element的后台Element的后台Element的后台Element的后台</a>
            <span>time</span>
          </div>
        </div>
      </div>
    </Card>
  )
}