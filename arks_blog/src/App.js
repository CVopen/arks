import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Router from './router'
import { HashRouter } from 'react-router-dom'
import Header from './components/header'

import './utils/rem'
import './assets/style/index.scss'
import 'antd/dist/antd.css'
import zhCN from 'antd/lib/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { ConfigProvider } from 'antd';
import Back from './components/back'
moment.locale('zh-cn')

class App extends Component {
  render () {
    return (
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <Header/>
          <HashRouter>
            <Router />
          </HashRouter>
        </Provider>
        <Back />
      </ConfigProvider>
    )
  }
}

export default App
