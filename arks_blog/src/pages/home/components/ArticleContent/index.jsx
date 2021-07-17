import Item from '@/components/articleItem'
import { Card } from 'antd'
import { Pagination } from 'antd';
export default function Article() {

  const randomDirection = () => {
    let text = 'row'
    if (Math.random() * 12 > 6) {
      text = 'row-reverse'
    }
    return text
  }

  return (
    <Card hoverable className="cart">
      {
        Array(10).fill(0).map((_, index) => 
          <Item key={index} border={index === 9 ? false : true} direction={randomDirection()} />
        )
      }
      <Pagination size="small" total={5000} />
    </Card>
  )
  
}
