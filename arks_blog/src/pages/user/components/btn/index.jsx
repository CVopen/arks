import style from './index.module.scss'
import { Button } from 'antd'
// import { getCaptcha, login } from '../../../api/auth'
export default function Btn(props) {
  return (
    <Button className={style.btn} size="large" onClick={props.onClick}>
      { props.text }
    </Button>
  )
}