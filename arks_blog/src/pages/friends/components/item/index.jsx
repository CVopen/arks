import Container from './styled'
export default function FriendItem(props) {
  console.log(props.item);
  return (
    <Container className="friend-item" onClick={() => window.open(props.item.url)}>
      { props.index % 2 === 1 && <img src={props.item.icon} alt="" />}
      <div className="friend-content">
        <h2>{props.item.name}</h2>
        <p>{props.item.desc}</p>
      </div>
      { props.index % 2 === 0 && <img src={props.item.icon} alt="" />}
    </Container>
  )
}
