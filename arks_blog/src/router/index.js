// import React from 'react'
import { Switch, Redirect, Route, useLocation } from 'react-router-dom'
import { Fragment, useEffect } from 'react'
import routes from './router'
import bus from '../utils/bus'
export default function Router() {
  const { pathname } = useLocation()
  useEffect(() => {
    changePath()
  }, [pathname])// eslint-disable-line react-hooks/exhaustive-deps

  // path变化
  const changePath = () => {
    bus.emit('scrollTop', pathname === '/404')
  }

  return (
    <Switch>
      {
        routes.map((item, index) => {
          if(!item.redirect && item.path !== '*') {
            return <Route 
                      key={index} 
                      exact 
                      path={item.path} 
                      component={item.component} 
                    />
          } else if (item.redirect) {
            return (
                <Redirect key={index} from="/" to={item.redirect}/>
            )
          } else if (item.path === '*') {
            return <Route key={index} component={item.component}></Route>
          }
          return <Fragment key={index}></Fragment>
        })
      }
    </Switch>
  )
}

