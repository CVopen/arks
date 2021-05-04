import style from './index.module.scss'

export default function MaskImg() {

  const btn = () => {
    document.getElementsByTagName('body')[0].style.setProperty('--theme-color','red')
  }

  return (
    <div className={style.mask}>
      <img src="http://p1.music.126.net/QSX3ieL9kzUukewQXf5law==/109951165925791179.jpg?param=140y140" alt="a" />
      <div className={style.maskCom}>
        <div style={{width: '200px', height: '200px', backgroundColor: 'red'}} onClick={btn}>变色</div>
        <div className={style.auraOwn}></div>
        <div className={style.auraTwo}></div>
      </div>
    </div>
  )
}