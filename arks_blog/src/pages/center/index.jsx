import style from './index.module.scss'
import Cropper from './components/cropper'

export default function Center () {
  
  return (
    <div className={style.center}>
      <div className={style.upload}>
        <Cropper />
      </div>
    </div>
  )
}