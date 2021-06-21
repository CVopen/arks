import Container from './styled'
import { random } from '@utils/utils'
import { useState } from 'react'
export default function CategoryItem(props) {
  const [ bgc, resetColor ] = useState('#' + parseInt(random(0xeeeeee)).toString(16))

  const color = () => {
    if (bgc.length < 7) {
      console.log(bgc);
      resetColor('#' + parseInt(random(0xeeeeee)).toString(16))
    }
  }

  return (
    <Container style={{"borderBottom": props.border ? '1px solid #eee' : 'none'}}>
      { color() }
      <div className="category-item">
        <div className="category-circular" style={{backgroundColor: bgc}}>{props.num}</div>
        <div className="category-info">
          <div className="category-title">{props.title}</div>
          {/* <p>{props.desc}</p> */}
          <p>速度发货速度了快捷方式雕刻技法卢卡斯的士大夫集散地立刻解放螺丝钉看见发生的速度发货速度了快捷方式雕刻技法卢卡斯的士大夫集散地立刻解放螺丝钉看见发生的速度发货速度了快捷方式雕刻技法卢卡斯的士大夫集散地立刻解放螺丝钉看见发生的速度发货速度了快捷方式雕刻技法卢卡斯的士大夫集散地立刻解放螺丝钉看见发生的</p>
        </div>
      </div>
      <div className="category-num">
        <img src={require('@/assets/images/category.svg').default} alt="" />
        <span>文章: 1000000</span>
      </div>
    </Container>
  )
}
