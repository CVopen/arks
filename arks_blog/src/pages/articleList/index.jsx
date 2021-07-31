import style from './index.module.scss'

import Mask from '@/components/maskImg'
import PageTitle from '@/components/pageTitile'
import Info from '@/components/info'
import Notice from '@/components/notice'
import NewArticle from '@/components/newArticle'
import { useSelector } from 'react-redux'
import { getArticleCategoryList, getArticleTagList } from '@/api/article'
import { useEffect, useState } from 'react'
import { decodeQuery } from '@utils/RouterQuery'
import { Pagination } from 'antd'
import Item from '@/components/articleItem'

export default function Home (props) {
  const store = useSelector(({ app }) => app.config)
  
  const [ list, changeList ] = useState({ total: 0, data: []})
  const [ listTag, changeListTag ] = useState([])
  const [ title, changeListTitle ] = useState({
    PageTitle: '',
    title: ''
  })
  const [ params, changeparams ] = useState({
    page: 1,
    pageSize: 10
  })
  const idObj = decodeQuery(props.location.search)

  useEffect(() => {
    getDetail()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDetail = (page = 1) => {
    if (idObj.tid) {
      getArticleTagList({ tag_id: idObj.tid }).then(res => {
        changeListTag(res.data)
        changeListTitle({
          PageTitle: '标签下文章列表',
          title: res.data.length > 0 ? res.data[0].category_name : '暂无文章'
        })
      })
    } else {
      getArticleCategoryList({ ...params, page, category_id: idObj.cid}).then(res => {
        changeList({
          data: res.data.data,
          total: res.data.total
        })
        changeListTitle({
          PageTitle: '分类下文章列表',
          title: res.data.data.length > 0 ? res.data.data[0].category_name : '暂无文章'
        })
      })
    }
  }

  const pageChange = page => {
    if (page !== params.page) {
      getDetail(page)
      changeparams({...params, page})
    }
  }

  const pageSizeChange = pageSize => {
    changeparams({...params, pageSize})
  }

  const randomDirection = () => {
    let text = 'row'
    if (Math.random() * 12 > 6) {
      text = 'row-reverse'
    }
    return text
  }

  return (
    <div className={style.home}>
      <Mask src={store.article_img} height text={title.title} />
      <div className="content">
        <div className="left">
          <PageTitle title="当前位置: 文章列表" src='article' text={title.PageTitle} />
          {
            list.data.map((item, index) => 
              // eslint-disable-next-line react/jsx-no-duplicate-props
              <Item key={item.ID} item={item} key={item.ID} border={index === list.data.length - 1 ? false : true} direction={randomDirection()} />
            )
          }
          {
            listTag.map((item, index) => 
              // eslint-disable-next-line react/jsx-no-duplicate-props
              <Item key={item.ID} item={item} key={item.ID} border={index === list.data.length - 1 ? false : true} direction={randomDirection()} />
            )
          }
          { 
            list.total > params.pageSize && <Pagination size="small" total={list.total} onChange={pageChange} onShowSizeChange={pageSizeChange} />
          }
        </div>
        <div className="right">
          <Info history={props.history} />
          <Notice />
          <NewArticle />
        </div>
      </div>
    </div>
  )
}
