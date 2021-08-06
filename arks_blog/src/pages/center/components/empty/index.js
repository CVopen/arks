/* eslint-disable react-hooks/exhaustive-deps */
import { CalendarOutlined, AuditOutlined, MessageOutlined, CopyOutlined, AreaChartOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import style from './index.module.scss'

export default function Empty(props) {
  const [info, change] = useState({})
  useEffect(() => {
    switch (props.tab) {
      case 1:
        change({ text: '您还没有发布文章', icon: <CalendarOutlined /> })
        break;
      case 2:
        change({ text: '您还没有浏览文章', icon: <AuditOutlined /> })
        break;
      case 3:
        change({ text: '您还没有评论文章', icon: <MessageOutlined /> })
        break;
      case 4:
        change({ text: '您还没有反馈意见', icon: <CopyOutlined /> })
        break;
      case 5:
        change({ text: '暂无数据', icon: <AreaChartOutlined /> })
        break;
      default:
        break;
    }
  }, [])

  return (
    <div className={style.empty}>
      {info.icon}
      <p>{info.text}</p>
    </div>
  )
}