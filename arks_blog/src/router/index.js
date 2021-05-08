// import React from 'react'
import { Switch, Redirect, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import routes from './router'
import bus from '../utils/bus'
import Stroage from '../utils/localStorage'
export default function Router() {
  const { pathname } = useLocation()
  useEffect(() => {
    changePath()
  }, [pathname])// eslint-disable-line react-hooks/exhaustive-deps

  // path变化
  const changePath = () => {
    bus.emit('scrollTop', pathname === '/404')
  }
  const targetRouterConfig = routes.find((item) => {
    return item.path === pathname
  })

  return (
    <Switch>
      {
        targetRouterConfig ? 
        <Auth target={targetRouterConfig} /> :
        <Redirect to={'/404'}/>
      }
    </Switch>
  )
}

function Auth(props) {
  const { target } = props
  const token = Stroage('token')
  if (target.path === '/login' && token) {
    return <Redirect to={'/'} />
  }
  if (!token && target.path === '/center') {
    return <Redirect to={'/login'} />
  }
  return (
    <Route 
      exact 
      path={target.path} 
      component={target.component} 
    />
  )
}
