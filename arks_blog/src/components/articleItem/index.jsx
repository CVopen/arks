import Container from './styled'
import {
  FieldTimeOutlined,
  TagsOutlined,
  AppstoreOutlined
} from "@ant-design/icons"
export default function ArticleItem(props) {
  return (
    <Container style={{"borderBottom": props.border ? '1px solid #eee' : 'none'}}>
      <div className="header" style={{flexDirection: props.direction}}>
        <div className="img">
          <img src="https://s1.ax1x.com/2020/06/29/NWtFJA.jpg" alt="" />
        </div>
        <div className="header-content" style={{alignItems: props.direction === 'row' ? 'flex-end' : 'flex-start'}}>
          <h2>js数组常用方法整理</h2>
          <p>js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理</p>
        </div>
      </div>
      <div className="tag">
        <div className="tag-left">
          <div className="item">
            <FieldTimeOutlined style={{color: '#ff7675'}}/>
            2016-01-12 20:23:23
          </div>
          <div className="item">
            <TagsOutlined style={{color: '#f39c12'}}/>
            前端\前端\前端\前端
          </div>
        </div>
        <div className="tag-right">
          <AppstoreOutlined style={{color: '#39A2DB'}}/>
          分类: jvav
        </div>
      </div>
    </Container>
  )
}