import Container from './styled'
import { Card } from 'antd'
import Item from '../item'

export default function TagItem(props) {
  return (
    <Card hoverable className="cart">
      <Container>
        {
          Array(10).fill(0).map((_, index) => 
            <Item key={index} />
          )
        }
      </Container>
    </Card>
  )
}
