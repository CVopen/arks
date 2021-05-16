import style from './index.module.scss'
import './index.scss'
import Comic from '../../../../components/canvas'

export default function From(props) {
  const { title } = props
  return (
    <div className={style.user}>
      {/* <div style={{position: 'relative',height: window.innerHeight}}> */}
        <h2 className={[style.title, style.name].join(' ')}>ark</h2>
        <Comic />
        <div className='from'>
          <span className={style.title}>{ title }</span>
          {props.children}
        </div>
      {/* </div> */}
    </div>
  );
}

