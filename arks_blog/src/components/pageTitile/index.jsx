import { Card } from 'antd'
import Container from './styled'
export default function PageTitle(props) {

  return (
    <Card hoverable className="cart">
      <Container>
        <div className="info">
          <span className="title">{props.title}</span>
          <span>记录学习过程中的一些笔记</span>
        </div>
        <img src="http://school-admin.oss-cn-beijing.aliyuncs.com/file/20210612/0eb83b7eb6d8e65f46669658fe1ff603.jpg" alt="" />
      </Container>
    </Card>
  )
}