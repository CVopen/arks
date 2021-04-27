import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Router from './router'
import { HashRouter } from 'react-router-dom'
import Header from './components/header'
class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Header/>
        <HashRouter>
          <Router />
        </HashRouter>
      </Provider>
    )
  }
}

export default App
