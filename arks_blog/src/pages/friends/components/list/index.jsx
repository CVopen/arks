import Item from '../item/index'
import Container from './styled'
import { getFriendsList } from '@/api/link'
import { useEffect, useState } from 'react'
export default function FriendList() {
  const [list, changeList] = useState([])

  useEffect(() => getList(), [])

  const getList = () => {
    getFriendsList({ pageSize: 10000, state: 1 }).then(res => {
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
