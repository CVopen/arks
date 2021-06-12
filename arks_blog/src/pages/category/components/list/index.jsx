import Item from '../item/index'
import { Card } from 'antd'
export default function Tag() {
  return (
    <Card hoverable className="cart">
      {
        Array(10).fill(0).map((_, index) => 
          <Item key={index} num={index+1} desc={index} title={'jvav'} border={index === 9 ? false : true} />
        )
      }
    </Card>
  )
}
