import style from './index.module.scss'
import { DeleteOutlined, FieldTimeOutlined, AppstoreOutlined } from '@ant-design/icons'
import { formDate } from '@/utils/utils'
import Empty from '../empty/index'
import { encodeQuery } from '@utils/RouterQuery'
import { delHistoryList } from '@/api/center'
import { HistoryContext } from '../../index'
import { useContext } from 'react'

export default function History(props) {
  const { data: { data } } = props
  
  const change = (id) => {
    const { data } = props 
    for (const key in data.data) {
      for (let index = 0; index < data.data[key].length; index++) {
        if (data.data[key][index].ID === id) {
          data.data[key].splice(index, 1)
          props.changeList(Object.assign({}, data))
          return
        }
      }
    }
  }
  return (
    <>
      {
        (data && !data.today.length && !data.yesterday.length && !data.earlier.length) ? 
          <Empty tab={2}/>
        :
        <div className={style.history}>
          <div className={style.left}>
            { data && data.today.length > 0 && <div className={style.title} style={{top: '20px'}}>今天</div> }
            { data && data.yesterday.length > 0 &&<div className={style.title} style={{top: data.today.length * 100 + 20 + 'px'}}>昨天</div> }
            { data && data.earlier.length > 0 && <div className={style.title} style={{top: (data.yesterday.length + data.today.length) * 100 + 20 + 'px'}}>更早</div> }
          </div>
          <div className={style.right}>
            { data && data.today.map(item => <Item key={item.ID} change={change} item={item} flag />) }
            { data && data.yesterday.map(item => <Item key={item.ID} change={change} item={item} flag />) }
            { data && data.earlier.map(item => <Item key={item.ID} change={change} item={item} />) }
            { !props.data.lastMore && <div className={style.more}>无更多数据</div> }
          </div>
        </div>
      }
    </>
  )
}

const Item = (props) => {
  const context = useContext(HistoryContext)
  const toPath = (type) => {
    return () => {
      if (type === 'list') {
        context.push({pathname:'/article_list', search: encodeQuery({ cid: props.item.c_id })})
      } else {
        context.push({pathname:'/article_details', search: encodeQuery({ id: props.item.a_id })})
      }
    }
  }

  const del = () => {
    delHistoryList({ id: props.item.ID }).then(() => {
      props.change(props.item.ID)
    })
  }
  console.log(formDate(props.item.UpdatedAt, props.flag ? 'hh:mm' : 'YYYY-MM-DD'));
  return (
    <div className={style.item}>
      <img style={{objectFit: 'contain', width: '110px'}} onClick={toPath()} src={props.item.img} alt="" />
      <div className={style.content}>
        <h1 onClick={toPath()}>{props.item.title}</h1>
        <div className={style.bottom}>
          <div className={style.time}>
            <FieldTimeOutlined />{formDate(props.item.UpdatedAt, props.flag ? 'hh:mm' : 'YYYY-MM-DD')}
          </div>
          <div className={style.user}>
            <img src={props.item.u_img} alt="title" />
            {props.item.u_name}
          </div>
          <div className={style.category}>
            <span onClick={toPath('list')}><AppstoreOutlined />{props.item.c_name}</span>
          </div>
        </div>
        <div className={style.del} onClick={del}>
          <DeleteOutlined />
        </div>
      </div>
    </div>
  )
}