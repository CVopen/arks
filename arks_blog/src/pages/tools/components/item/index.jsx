import Container from './styled'
export default function ToolsItem(props) {
  return (
    <Container className="tools-item" onClick={() => window.open(props.item.url)}>
      <h2 className="tools-item-title">vue.js</h2>
      <div className="tools-item-content">
        <img src={props.item.icon} alt="" />
        <div className="tools-content">
          <h2>{props.item.name}</h2>
          <p>{props.item.desc}</p>
        </div>
      </div>
    </Container>
  )
}
