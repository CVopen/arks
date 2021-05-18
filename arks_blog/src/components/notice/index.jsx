// import { useSelector, useDispatch } from 'react-redux'
import { Card } from 'antd'
import { BellOutlined } from '@ant-design/icons'

export default function Notice(props) {
  
  return (
    <Card hoverable className="cart">
      <div className="text" style={{fontSize: '20px'}}>
        <BellOutlined style={{color: 'red'}}/> 公告
        <p style={{fontSize: '16px', marginTop: '10px'}}>213124124</p>
        
      </div>
    </Card>
  )
}