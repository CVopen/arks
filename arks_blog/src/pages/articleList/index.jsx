import style from './index.module.scss'

import Mask from '@/components/maskImg'
import PageTitle from '@/components/pageTitile'
import Info from '@/components/info'
import Notice from '@/components/notice'
import NewArticle from '@/components/newArticle'
import { useSelector } from 'react-redux'

export default function Home (props) {
  const store = useSelector(({ app }) => app.config)
  console.log(props);
  return (
    <div className={style.home}>
      <Mask src={store.article_img} height text="123" />
      <div className="content">
        <div className="left">
          <PageTitle title="文章列表" src='article' text="记录学习过程中的一些笔记" />
          <p>1231254</p>
        </div>
        <div className="right">
          <Info history={props.history} />
          <Notice />
          <NewArticle />
        </div>
      </div>
    </div>
  )
}
