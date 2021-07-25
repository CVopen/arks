import Container from './styled'
import { Card } from 'antd'
import Item from '../item'
import { useEffect, useState } from 'react'
import { getTagList } from '@/api/tag'

export default function TagItem(props) {
  const [list, changeList] = useState([])

  useEffect(() => {
    getList()
  }, [])

  const getList = () => {
    getTagList({ pageSize: 10000}).then(res => {
      changeList(res.data)
    })
  }

  return (
    <Card hoverable className="cart">
      <Container>
        { list.map(item => <Item key={item.ID} item={item} />) }
      </Container>
    </Card>
  )
}
