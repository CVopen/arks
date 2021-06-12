import Container from './styled'
import Mask from '@/components/maskImg'
import PageTitle from '@/components/pageTitile'
import Info from '@/components/info'
import Notice from '@/components/notice'
import List from './components/list/index'

export default function Category(props) {
  return (
    <Container>
      <Mask height text="分类" />
      <div className="content">
        <div className="left">
          <PageTitle title="文章分类" />
          <List />
        </div>
        <div className="right">
          <Info history={props.history} />
          <Notice />
        </div>
      </div>
    </Container>
  )
}
