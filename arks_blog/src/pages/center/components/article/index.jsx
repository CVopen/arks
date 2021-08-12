import Item from '@/components/articleItem'
import Empty from '../empty/index'
import style from './index.module.scss'
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
      props.list.data && !props.list.data.length ?
      <Empty tab={1} /> :
      <>
        {
          props.list.data && props.list.data.map((item, index) => 
          // eslint-disable-next-line react/jsx-no-duplicate-props
            <Item key={item.ID} item={item} key={item.ID} border={index === props.list.length - 1 ? false : true} direction={randomDirection()} />
          )
        }
        { !props.list.lastMore && <div className={style.more}>无更多数据</div> }
      </> 
    }
    </>
  )
}