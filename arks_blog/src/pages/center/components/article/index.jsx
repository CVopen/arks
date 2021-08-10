import Item from '@/components/articleItem'
export default function Article(props) {
  const randomDirection = () => {
    let text = 'row'
    if (Math.random() * 12 > 6) {
      text = 'row-reverse'
    }
    return text
  }
  return (
    <>
    {
      props.list && props.list.map((item, index) => 
        // eslint-disable-next-line react/jsx-no-duplicate-props
        <Item key={item.ID} item={item} key={item.ID} border={index === props.list.length - 1 ? false : true} direction={randomDirection()} />
      )
    }
    </>
  )
}