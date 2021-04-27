// 404页面
import Nofound from '../pages/NoFound/index.jsx'
import Test from '../pages/test.jsx'
const routes = [
  {
    path: '/test',
    component: Test
  },
  // {
  //   path: '/index',
  //   redirect: '/index/discover'
  // },
  {
    path: '*',
    component: Nofound
  }
]
export default routes