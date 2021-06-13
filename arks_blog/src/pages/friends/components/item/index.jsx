import Container from './styled'
export default function FriendItem(props) {
  return (
    <Container className="friend-item" onClick={() => window.open('https://cn.vuejs.org/')}>
      { props.index % 2 === 1 && <img src="http://zhizi-public.oss-cn-hangzhou.aliyuncs.com/20210511/f472a827fcfb5bf808ec12d08026ce24.png" alt="" />}
      <div className="friend-content">
        <h2>vue.js</h2>
        <p>文档文档文档文档文档文档文档文档文档文档文档文档文档文档文档</p>
      </div>
      { props.index % 2 === 0 && <img src="http://zhizi-public.oss-cn-hangzhou.aliyuncs.com/20210511/f472a827fcfb5bf808ec12d08026ce24.png" alt="" />}
    </Container>
  )
}
