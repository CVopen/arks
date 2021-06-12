import List from './components/list/index'
import Page from '@/components/pageCom/index'

export default function Category(props) {
  return (
    <Page history={props.history}>
      <List />
    </Page>
  )
}
