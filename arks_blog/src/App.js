import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Router from './router'
import Header from './components/header'
import './utils/scroll'
import './utils/rem'
import './assets/style/index.scss'
import 'antd/dist/antd.css'
import zhCN from 'antd/lib/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { ConfigProvider } from 'antd';
import Back from './components/back'
import Footer from './components/footer'
import { HashRouter } from 'react-router-dom'
moment.locale('zh-cn')

class App extends Component {

  render () {
    return (
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <HashRouter>
            <Header/>
            <Router />
            <Back />
          </HashRouter>
        </Provider>
        <Footer />
      </ConfigProvider>
    )
  }
}

export default App
