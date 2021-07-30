import { Switch, Redirect, Route, useLocation } from 'react-router-dom'
import { useEffect, Suspense } from 'react'
import routes from './router'
import bus from '../utils/bus'
import Stroage from '../utils/localStorage'
import Loading from '../components/loading/index.jsx'

export default function Router() {
  const { pathname } = useLocation()
  useEffect(() => {
    changePath()
  }, [pathname])// eslint-disable-line react-hooks/exhaustive-deps

  // path变化
  const changePath = () => {
    document.body.scrollTop = 0
    bus.emit('scrollTop', pathname === '/404')
  }
  const targetRouterConfig = routes.find((item) => {
    return item.path === pathname
  })

  return (
    <Switch>
      <Suspense fallback={Loading()}>
        {
          targetRouterConfig ? 
          <Auth target={targetRouterConfig} /> :
          <Redirect to={'/404'}/>
        }
      </Suspense>
    </Switch>
  )
}

function Auth(props) {
  const { target } = props
  const token = Stroage('get' ,'token')
  
  if (target.path.indexOf('/user') >= 0 && token) {
    return <Redirect to={'/'} />
  }
  if (!token && target.path === '/center') {
    return <Redirect to={'/user/login'} />
  }
  return (
    <Route 
      exact
      path={target.path} 
      component={target.component} 
    />
  )
}
