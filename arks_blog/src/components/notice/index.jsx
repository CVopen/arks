// import { useSelector, useDispatch } from 'react-redux'
import { Card } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

export default function Notice() {

  const store = useSelector(({ app }) => app.config)
  
  return (
    <Card hoverable className="cart">
      <div className="text" style={{fontSize: '20px'}}>
        <BellOutlined style={{color: '#ff7675'}}/> 公告
        <p style={{fontSize: '16px', marginTop: '10px'}}>{ store.notice }</p>
      </div>
    </Card>
  )
}