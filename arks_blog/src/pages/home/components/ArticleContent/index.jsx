import Item from '@/components/articleItem'
import { Card } from 'antd'
import { Pagination } from 'antd';
export default function Article() {
  return (
    <Card hoverable className="cart">
      {
        Array(10).fill(0).map((_, index) => 
          <Item key={index} border={index === 9 ? false : true} />
        )
      }
      <Pagination total={500} />
    </Card>
  )
  
}
