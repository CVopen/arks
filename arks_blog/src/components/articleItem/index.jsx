import Container from './styled'
import {
  FieldTimeOutlined,
  TagsOutlined,
  AppstoreOutlined
} from "@ant-design/icons"
import { formDate } from '@/utils/utils'
import { withRouter } from 'react-router-dom'
import { encodeQuery } from '@utils/RouterQuery'

function ArticleItem(props) {
  const toDetails = () => {
    props.history.push({pathname:'/article_details', search: encodeQuery({ id: props.item.ID })});
  }

  const toPath = id => {
    return () => {
      const obj = {}
      if (id) {
        obj.tid = id
      } else {
        obj.cid = props.item.category_id
      }
      props.history.push({pathname:'/article_list', search: encodeQuery(obj)})
    }
  }

  const date = new Date(props.item.CreatedAt)
  return (
    <Container style={{"borderBottom": props.border ? '1px solid #eee' : 'none'}}>
      <div className="header" style={{flexDirection: props.direction}}>
        <div className="img">
          <div className="time-visit">
            <span>{ date.getDate() < 10 ? `0${date.getDate()}` : date.getDate() }</span>
            <span>{date.getFullYear()}年{date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}月</span>
          </div>
          <img src={ props.item.img } onClick={toDetails} alt="" />
        </div>
        <div className="header-content" style={{alignItems: props.direction === 'row' ? 'flex-end' : 'flex-start'}}>
          <h2 onClick={toDetails}>{ props.item.title }</h2>
          <p onClick={toDetails}>{ props.item.summary }</p>
        </div>
      </div>
      <div className="tag">
        <div className="tag-left">
          <div className="item">
            <FieldTimeOutlined style={{color: '#ff7675'}}/>
            <span className="tag_item">{ formDate(props.item.CreatedAt, 'YYYY-MM-DD hh:mm:ss') }</span>
          </div>
          <div className="item">
            <TagsOutlined style={{color: '#f39c12'}}/>
            {
              props.item.tag_list.map(el => <span className="tag_item" onClick={toPath(el.id)} key={el.id}>{el.name} </span>)
            }
          </div>
        </div>
        <div className="tag-right">
          <AppstoreOutlined style={{color: '#39A2DB'}}/>
          分类: <span className="tag_item" onClick={toPath()}>{ props.item.category_name }</span>
        </div>
      </div>
    </Container>
  )
}

export default withRouter(ArticleItem)