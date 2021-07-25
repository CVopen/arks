import Item from '../item/index'
import Container from './styled'
import { getToolsList } from '@/api/link'
import { useEffect, useState } from 'react'
export default function ToolsList() {
  const [list, changeList] = useState([])

  useEffect(() => getList(), [])

  const getList = () => {
    getToolsList({ pageSize: 10000}).then(res => {
      changeList(res.data)
    })
  }

  return (
    <Container>
      {
        list.map((item, index) => 
          <Item key={index} item={item} />
        )
      }
    </Container>
  )
}
