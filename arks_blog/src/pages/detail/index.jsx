/* eslint-disable react-hooks/exhaustive-deps */
import Mask from '@/components/maskImg'
import Container from './styled'
import { 
  ReconciliationOutlined,
  FolderOutlined,
  UserOutlined,
  LinkOutlined
} from '@ant-design/icons'
import { getArticleDetail } from '@/api/article'
import { useEffect,useState } from 'react'
import { decodeQuery } from '@utils/RouterQuery'

export default function Detail (props) {
  console.log(decodeQuery(props.location.search));

  const [data, changeData] = useState({})

  useEffect(() => {
    getArticleDetail({ id: decodeQuery(props.location.search).id }).then(res => {
      console.log(res);
      changeData(res.data)
    })
  }, [])

  return (
    <Container>
      <Mask height src={data.img} text={data.title} />
      <div style={{flexDirection: 'column'}} className="content">
        <div className="detials-header">
          <div>
            <ReconciliationOutlined /> 发布于2021-03-16 21:02:13
          </div>
          <div>
            <FolderOutlined /> 所属分类
          </div>
          <div>
            <UserOutlined /> 讲道理
          </div>
          <div>
            <LinkOutlined /> 复制文章链接
          </div>
        </div>
        <div className="vditor-reset" dangerouslySetInnerHTML={{__html:data.md_content}}></div>
      </div>
    </Container>
  )
}
