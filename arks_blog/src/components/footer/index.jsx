import style from './index.module.scss'
import {
  QqOutlined,
  WechatOutlined,
  GithubOutlined
} from '@ant-design/icons'
export default function Footer() {
  return (
    <div className={style.footer}>
      <h3>愿我们写的每一行代码都对得起背井离乡。</h3>
      <div className={style.icon}>
        <div className={style.circular}>
          <a href="tencent://message/?uin=1123038371&Site=&Menu-=yes" title="1123038371">
            <QqOutlined style={{ fontSize: '18px' }} />
          </a>
        </div>
        <div className={style.circular}>
          <WechatOutlined style={{ fontSize: '18px' }} />
        </div>
        <div className={style.circular}>
          <a href="https://github.com/CVopen" target="view_window">
            <GithubOutlined style={{ fontSize: '18px' }} />
          </a>
        </div>
      </div>
    </div>
  )
}