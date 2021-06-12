import Container from './styled'
export default function PageTitle(props) {

  return (
    <Container>
      <div className="info">
        <span className="title">{props.title}</span>
        <span>{props.text}</span>
      </div>
      <img src={require(`@/assets/images/tag/${props.src}.svg`).default} alt="" />
    </Container>
  )
}