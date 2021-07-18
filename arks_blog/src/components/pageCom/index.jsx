/* eslint-disable react-hooks/exhaustive-deps */
import Container from './styled'
import Mask from '@/components/maskImg'
import PageTitle from '@/components/pageTitile'
import Info from '@/components/info'
import Notice from '@/components/notice'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function PageCom(props) {
  useEffect(()=> init(), [])

  const [ data, changeData ] = useState({})
  const store = useSelector(({ app }) => app.config)
  const init = () => {
    switch (props.history.location.pathname) {
      case '/category':
        changeData({
          text: '分类',
          title: '当前位置: 全部分类',
          src: 'category',
          spanText: '文章分类',
          img: store.category_img
        })
        return
      case '/tag':
        changeData({
          text: '标签',
          title: '当前位置: 全部标签',
          src: 'tag',
          spanText: '文章标签',
          img: store.tag_img
        })
        return
      case '/tools':
        changeData({
          text: '工具',
          title: '当前位置: 实用工具',
          src: 'tools',
          spanText: '记录一些常用工具、文档等',
          img: store.tools_img
        })
        return
      case '/friends':
        changeData({
          text: '友链',
          title: '当前位置: 友链',
          src: 'friends',
          spanText: '大佬们的博客链接',
          img: store.friends_img
        })
        return
      default:
        return
    }
  }

  return (
    <Container>
      <Mask height text={data.text} src={data.img} />
      <div className="content">
        <div className="left">
          { data.src && <PageTitle title={data.title} src={data.src} text={data.spanText} /> }
          {
            Array.isArray(props.children) ? 
            props.children[0] :
            props.children
          }
        </div>
        <div className="right">
          <Info history={props.history} />
          <Notice />
          { Array.isArray(props.children) && props.children[1] }
        </div>
      </div>
    </Container>
  )
}
