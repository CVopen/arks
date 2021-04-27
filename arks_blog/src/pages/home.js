import { Route, Switch, HashRouter } from 'react-router-dom'
import React, { Component } from 'react'
import Text from './test.jsx'
export default class Home extends Component{
  render() {
    return (
      <HashRouter>
        {/* <div>home</div> */}
        <div>
          <Switch>
            <Route 
              path='/home'
              component={Text} 
            />
          </Switch>
        </div>
      </HashRouter>
    )
  }
}

