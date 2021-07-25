import Container from './styled'
export default function ToolsItem(props) {
  return (
    <Container className="tools-item" onClick={() => window.open('https://cn.vuejs.org/')}>
      <h2 className="tools-item-title">vue.js</h2>
      <div className="tools-item-content">
        <img src="http://zhizi-public.oss-cn-hangzhou.aliyuncs.com/20210511/f472a827fcfb5bf808ec12d08026ce24.png" alt="" />
        <div className="tools-content">
          <h2>vue.js</h2>
          <p>文档文档文档文档文档文档文档文档文档文档文档文档文档文档文档</p>
        </div>
      </div>
    </Container>
  )
}
