import style from './index.module.scss'
export default function NoFound() {
  return (
    <div className={style['no-found']}>
      <span>404</span>
      <img src={require('../../assets/images/error-404.svg').default} alt="404"/>
    </div>
  )
}