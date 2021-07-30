/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/exhaustive-deps */
import Item from '@/components/articleItem'
import { Card } from 'antd'
import { Pagination } from 'antd';
import { getArticleList } from '@/api/article'

import { useState, useEffect } from 'react'

export default function Article() {

  const randomDirection = () => {
    let text = 'row'
    if (Math.random() * 12 > 6) {
      text = 'row-reverse'
    }
    return text
  }

  const [ list, changeList ] = useState({ total: 0, data: []})
  const [ params, changeparams ] = useState({
    page: 1,
    pageSize: 10,
    state: 1
  })
  
  useEffect(() => {
    getList()
  }, [])

  const getList = (page = 1) => {
    getArticleList({ ...params, page}).then(res => {
      changeList({
        data: res.data.data,
        total: res.data.total
      })
    })
  }

  const pageChange = page => {
    if (page !== params.page) {
      getList(page)
      changeparams({...params, page})
    }
  }

  const pageSizeChange = pageSize => {
    changeparams({...params, pageSize})
  }

  return (
    <Card hoverable className="cart">
      {
        list.data.map((item, index) => 
          <Item key={item.ID} item={item} key={item.ID} border={index === list.data.length - 1 ? false : true} direction={randomDirection()} />
        )
      }
      { 
        list.total > params.pageSize && <Pagination size="small" total={list.total} onChange={pageChange} onShowSizeChange={pageSizeChange} />
      }
    </Card>
  )
  
}
