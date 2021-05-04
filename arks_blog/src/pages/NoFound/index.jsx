import style from './index.module.scss'
import { Button } from 'antd'
export default function NoFound(props) {
  const { history } = props 
  return (
    <div className={style['no-found']}>
      <div className={style.content}>
        <img src={require('../../assets/images/error-404.svg').default} alt="404"/>
        <div className={style.tip}>
          <span>404</span>
          <span>您的页面好像飞走了噢。。。</span>
        </div>
        <div className={style.btn}>
          <Button shape="round" onClick={() => history.replace('/')} >返回首页</Button>
        </div>
      </div>
    </div>
  )
}