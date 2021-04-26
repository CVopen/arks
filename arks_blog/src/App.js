import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <h1>hello world</h1>
      </Provider>
    )
  }
}

export default App
