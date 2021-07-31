import Container from './styled'
import { random } from '@utils/utils'
import { encodeQuery } from '@utils/RouterQuery'
import { withRouter } from 'react-router-dom'

function TagItem(props) {

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

  const toPath = () => {
    props.history.push({pathname:'/article_list', search: encodeQuery({ tid: props.item.ID })});
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
      <span onClick={toPath}>{props.item.name}</span>
    </Container>
  )
}

export default withRouter(TagItem)