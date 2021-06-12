import Container from './styled'
export default function TagItem(props) {
  return (
    <Container style={{"borderBottom": props.border ? '1px solid #eee' : 'none'}}>
      <div className="category-item">
        <div className="category-circular">{props.num}</div>
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
