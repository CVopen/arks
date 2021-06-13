import Item from '../item/index'
import Container from './styled'
export default function ToolsList() {
  return (
    <Container>
      {
        Array(10).fill(0).map((_, index) => 
          <Item key={index} />
        )
      }
    </Container>
  )
}
