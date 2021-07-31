import Container from './styled'
import { random } from '@utils/utils'
import { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { encodeQuery } from '@utils/RouterQuery'

function CategoryItem(props) {
  const [ bgc, resetColor ] = useState('#' + parseInt(random(0xeeeeee)).toString(16))

  const color = () => {
    if (bgc.length < 7) {
      console.log(bgc);
      resetColor('#' + parseInt(random(0xeeeeee)).toString(16))
    }
  }

  const toPath = () => {
    props.history.push({pathname:'/article_list', search: encodeQuery({ cid: props.item.ID })});
  }

  return (
    <Container style={{"borderBottom": props.border ? '1px solid #eee' : 'none'}}>
      { color() }
      <div className="category-item">
        <div className="category-circular" style={{backgroundColor: bgc}}>{props.num}</div>
        <div className="category-info">
          <div className="category-title" onClick={toPath}>{props.item.name}</div>
          <p>{props.item.desc}</p>
        </div>
      </div>
      <div className="category-num">
        <img src={require('@/assets/images/category.svg').default} alt="" />
        <span>文章: {props.item.count}</span>
      </div>
    </Container>
  )
}

export default withRouter(CategoryItem)