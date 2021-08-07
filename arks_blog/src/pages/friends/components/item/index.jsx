import Container from './styled'
export default function FriendItem(props) {
  return (
    <Container className="friend-item" onClick={() => window.open(props.item.url)}>
      <img src={props.item.icon} alt="" />
      <div className="friend-content">
        <h2>{props.item.name}</h2>
        <p>{props.item.desc}</p>
      </div>
    </Container>
  )
}
