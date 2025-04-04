import React ,{ useState } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Router from './router'
import Header from './components/header'
import Back from './components/back'
import Footer from './components/footer'
import Typing from './pages/typing'

import './utils'
import './assets/style/app.scss'
import 'moment/locale/zh-cn'
import './lib/hearts'

import zhCN from 'antd/lib/locale/zh_CN'
import moment from 'moment'
import { ConfigProvider } from 'antd'
import { BrowserRouter } from 'react-router-dom'
moment.locale('zh-cn')

export default function App() {
  const [show, setShow] = useState(false)
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
      {
        show ? 
        <BrowserRouter basename={ process.env.NODE_ENV === 'production' ? '/ark' : '/'}>
          <Header/>
          <Router />
          <Back />
          <Footer />
        </BrowserRouter> :
        <Typing setShow={setShow} />
      }
      </Provider>
    </ConfigProvider>
  )
}
