/* eslint-disable react-hooks/exhaustive-deps */
import Mask from '@/components/maskImg'
import Container from './styled'
import { 
  ReconciliationOutlined,
  FolderOutlined,
  UserOutlined,
  LinkOutlined,
  EyeOutlined,
  FolderOpenOutlined
} from '@ant-design/icons'
import { getArticleDetail } from '@/api/article'
import { Component } from 'react'
import { decodeQuery } from '@utils/RouterQuery'
import Vditor from 'vditor'
import { formDate } from '@/utils/utils'
import { encodeQuery } from '@utils/RouterQuery'

export default class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  componentDidMount () {
    this.getDetail(decodeQuery(this.props.location.search).id)
  }

  getDetail = (id) => {
    getArticleDetail({ id }).then(res => {
      new Date(res.data.UpdatedAt).getFullYear() === 1 && (res.data.UpdatedAt = false)
      Vditor.preview(document.getElementById('preview'), res.data.content, {
        anchor: 1
      })
      this.setState({
        data: res.data
      })
      // document.body.scrollTop = 0
      window.scrollTo(0, 0)
    })
  }

  toDetails = id => {
    return () => {
      if (!id) return
      this.props.history.push('/article_details'+ encodeQuery({ id }))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // 如果数据发生变化，则更新图表
    if (prevState.data.title && (parseInt(decodeQuery(this.props.location.search).id) !== prevState.data.id)) {
      // 这里执行相应的方法
      this.getDetail(decodeQuery(prevProps.location.search).id)
    }
  }

  render() {
    const { data } = this.state
    return (
      <Container>
        <Mask height src={data.img} text={data.title} />
        <div style={{flexDirection: 'column'}} className="content">
          <div className="detials-header">
            <div>
              <FolderOutlined /> 所属分类:{data.category}
            </div>
            <div>
              <FolderOpenOutlined /> 所属标签: {data.tag_list && data.tag_list.map(item => <span key={item.ID}>{item.name}</span>)}
            </div>
            <div>
              <UserOutlined /> {data.user_name}
            </div>
            {
              data.visit_count !== 0 && <div><EyeOutlined /> 浏览数量: {data.visit_count}</div>
            }
          </div>
          <div className="detials-header">
          <div>
              <ReconciliationOutlined /> 发布于: {formDate(data.CreatedAt, 'YYYY-MM-DD hh:mm:ss')}
            </div>
            {
              data.UpdatedAt && <div><ReconciliationOutlined /> 最后更新于: {formDate(data.UpdatedAt, 'YYYY-MM-DD hh:mm:ss')}</div>
            }
            <div>
              <LinkOutlined /> 复制文章链接
            </div>
          </div>
          <div className="summary">
            <h1>前言:</h1>
            <p>{data.summary}</p>
          </div>
          <div id="preview"></div>
          <div className="detail-footer">
            <div className="pre">
              <div className="next-text" onClick={this.toDetails(data.next && data.pre.ID)}>
                <h3>上一篇</h3>
                <p>{data.pre && data.pre.title ? data.pre.title : '无更多文章'}</p>
              </div>
            </div>
            <div className="next">
              <div className="next-text" onClick={this.toDetails(data.next && data.next.ID)}>
                <h3>下一篇</h3>
                <p>{data.next && (data.next.title ? data.next.title : '无更多文章')}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    )
  }
}