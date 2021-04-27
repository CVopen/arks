// import React from 'react'
import { Switch, Redirect, Route, HashRouter } from 'react-router-dom'
import { Fragment } from 'react'
import routes from './router'
export default function Router() {
  return (
    <HashRouter>
      <Switch>
        {
          routes.map((item, index) => {
            if(!item.redirect && item.path !== '*') {
              console.log(item.path)
              return <Route 
                        key={index} 
                        exact 
                        path={item.path} 
                        component={item.component} 
                      />
            } else if (item.redirect) {
              return (
                  <Redirect key={index} exact from="/" to={item.redirect}/>
              )
            } else if (item.path === '*') {
              return <Route key={index} component={item.component}></Route>
            }
            return <Fragment key={index}></Fragment>
          })
        }
      </Switch>
    </HashRouter>
  )
}

