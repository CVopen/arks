import Container from './styled'
import {
  FieldTimeOutlined,
  TagsOutlined,
  AppstoreOutlined
} from "@ant-design/icons"
import { formDate } from '@/utils/utils'

export default function ArticleItem(props) {

  return (
    <Container style={{"borderBottom": props.border ? '1px solid #eee' : 'none'}}>
      <div className="header" style={{flexDirection: props.direction}}>
        <div className="img">
          <img src={ props.item.img } alt="" />
        </div>
        <div className="header-content" style={{alignItems: props.direction === 'row' ? 'flex-end' : 'flex-start'}}>
          <h2>{ props.item.title }</h2>
          <p>{ props.item.summary }</p>
        </div>
      </div>
      <div className="tag">
        <div className="tag-left">
          <div className="item">
            <FieldTimeOutlined style={{color: '#ff7675'}}/>
            { formDate(props.item.CreatedAt, 'YYYY-MM-DD hh:mm:ss') }
          </div>
          <div className="item">
            <TagsOutlined style={{color: '#f39c12'}}/>
            {
              props.item.tag_list.map((item, index) => <span className="tag_item" key={index}>{ item} </span>)
            }
          </div>
        </div>
        <div className="tag-right">
          <AppstoreOutlined style={{color: '#39A2DB'}}/>
          分类: { props.item.category_name }
        </div>
      </div>
    </Container>
  )
}