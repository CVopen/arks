import Container from './styled'
import { random } from '@utils/utils'

export default function TagItem(props) {

  const styles = {
    color: '#' + parseInt(random(0xffffff)).toString(16),
    margin: `${random(30) + 10}px ${random(10) + 10}px ${random(10) + 10}px ${random(30) + 10}px`,
    fontSize: `${random(16) + 16}px`
  }

  const over = (e) => {
    e.target.style.color = '#ff7675'
  }

  const out = (e) => {
    e.target.style.color = styles.color
  }

  return (
    <Container
      style={{
        color: styles.color,
        margin: styles.margin,
        fontSize: styles.fontSize,
        lineHeight: styles.fontSize,
        height: styles.fontSize
      }}
      onMouseOver={over}
      onMouseOut={out}
    >
      {props.item.name}
    </Container>
  )
}
