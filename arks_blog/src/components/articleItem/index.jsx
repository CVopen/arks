import Container from './styled'
import {
  FieldTimeOutlined,
  TagsOutlined,
  AppstoreOutlined
} from "@ant-design/icons"
export default function ArticleItem(props) {

  return (
    <Container style={{"borderBottom": props.border ? '1px solid #eee' : 'none'}}>
      <h2>js数组常用方法整理</h2>
      <p>js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理js数组常用方法整理</p>
      <div className="tag">
        <div className="tag-left">
          <div className="item">
            <FieldTimeOutlined style={{color: '#ff7675'}}/>
            2016-01-12 20:23:23
          </div>
          <div className="item">
            <TagsOutlined style={{color: '#f39c12'}}/>
            前端
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