import Item from '../item/index'
import { Card } from 'antd'
import { getCategoryList } from '@/api/category'
import { useEffect, useState } from 'react'

export default function CategoryList(props) {
  const [list, changeList] = useState([])

  useEffect(() => getList(), [])

  const getList = () => {
    getCategoryList({ pageSize: 10000}).then(res => {
      changeList(res.data.sort((a, b) => b.count - a.count))
    })
  }

  return (
    <Card hoverable className="cart">
      {
        list.map((item, index) => 
          <Item key={index} num={index+1} item={item} border={index === list.length - 1 ? false : true} />
        )
      }
    </Card>
  )
}
