/* eslint-disable react-hooks/exhaustive-deps */
import Container from './styled'
import Mask from '@/components/maskImg'
import PageTitle from '@/components/pageTitile'
import Info from '@/components/info'
import Notice from '@/components/notice'
import { useEffect, useState } from 'react'

export default function PageCom(props) {
  useEffect(()=> init(), [])

  const [ text, changeText ] = useState('')
  const [ title, changeTitle ] = useState('')
  const [ src, changeSrc ] = useState('home')
  const [ spanText, changeSpanText ] = useState('')

  const init = () => {
    switch (props.history.location.pathname) {
      case '/category':
        changeText('分类')
        changeTitle('当前位置: 全部分类')
        changeSrc('category')
        changeSpanText('文章分类')
        return
      case '/tag':
        changeText('标签')
        changeTitle('当前位置: 全部标签')
        changeSrc('tag')
        changeSpanText('文章标签')
        return
      case '/tools':
        changeText('工具')
        changeTitle('当前位置: 实用工具')
        changeSrc('tools')
        changeSpanText('记录一些常用工具、文档等')
        return
      case '/friends':
        changeText('友链')
        changeTitle('当前位置: 友链')
        changeSrc('friends')
        changeSpanText('大佬们的博客链接')
        return
      default:
        return
    }
  }

  return (
    <Container>
      <Mask height text={text} />
      <div className="content">
        <div className="left">
          <PageTitle title={title} src={src} text={spanText} />
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
