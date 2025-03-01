import Container from './styled'
import { 
  ReconciliationOutlined,
  FieldTimeOutlined,
  UserOutlined
} from '@ant-design/icons'
import { getDate, getTime} from '@utils/utils'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Storage from '@/utils/localStorage'

function Command(props) {
  const { history, set } = props
  const nickName = useSelector((store) => store.user.userInfo.nickName)
  const [commandList, changeList] = useState([{date: getDate(), time: getTime(), key: '', cb: null}])
  const dispatch = useDispatch()

  useEffect(() => {
    if (!props.full) {
      listenerKeyboard()
    } else {
      removeKeyBoard()
    }
    return componentWillUnmount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.full, commandList])

  const keypress = (e) => {
    let key = commandList[commandList.length - 1].key
    if (47 < e.keyCode && e.keyCode < 91) {
      if (key.length === 10) return
      commandList[commandList.length - 1].key += e.key
      changeList([...commandList])
    }
    if (e.keyCode === 13) {
      if (key === 'cls') {
        changeList([{date: getDate(), time: getTime(), key: '', cb: null}])
        props.showHeader(false)
        return
      }
      commandList[commandList.length - 1].cb = commandType(commandList[commandList.length - 1].key)
      commandList.push({date: getDate(), time: getTime(), key: '', cb: null})
      changeList([...commandList])
      document.querySelector('.terminal-content') && (document.querySelector('.terminal-content').scrollTop = commandList.length * 1000)
    }
    if (e.keyCode === 8) {
      commandList[commandList.length - 1].key = key.slice(0, key.length - 1)
      changeList([...commandList])
    }
  }

  const listenerKeyboard = () => {
    document.addEventListener('keyup', keypress)
  }

  const removeKeyBoard = () => {
    document.removeEventListener('keyup', keypress)
  }

  const componentWillUnmount = () => {
    removeKeyBoard()
  }

  const commandType = key => {
    switch (key) {
      case '':
        return
      case 'help':
        return Help
      case 'login': 
        if (nickName) return () => <span>您已登录</span>
        history.push('/login')
        set(true)
        return () => <span>success</span>
      case 'register': 
        if (nickName) return () => <span>您已登录</span>
        history.push('/register')
        set(true)
        return () => <span>success</span>
      case 'logout': 
        if (!nickName) return () => <span>尚未登录</span>
        dispatch({type: 'SET_USERINFO', value: {}})
        Storage('remove', 'token')
        Storage('remove', 'userInfo')
        return () => <span>success</span>
      case 'center':
        if (!nickName) return () => <span>尚未登录</span>
        history.push('/center')
        set(true)
        return () => <span>success</span>
      case 'commit':
        return () => <span>success</span>
      case 'hide':
        set(true)
        return () => <span>success</span>
      case 'exit':
        return props.close(false)
      default:
        return () => errorTip(key)
    }
  }
  
  return (
    <>
      {
        commandList.map((item, index) => {
          return (
            <Fragment key={index}>
              <Container key={index}>
                <div className="command">
                  <div className="row-item date">
                    <ReconciliationOutlined />
                    {item.date}
                  </div>
                  <div className="row-item clock">
                    <FieldTimeOutlined />
                    {item.time}
                  </div>
                  <div className="row-item username">
                    <UserOutlined />
                    { nickName ? nickName : 'root'}
                  </div>
                  <span className={commandList.length - 1 === index ? 'command-input' : ''}>{item.key}</span>
                </div>
                <div className="result">
                  { item.cb && item.cb() }
                </div>
              </Container>
            </Fragment>
          )
        })
      }
      
    </>
  )
}
export default withRouter(Command)
const Help = () => {
  const helpList = [
    { key: 'login', value: '登录'},
    { key: 'register', value: '注册'},
    { key: 'center', value: '个人中心'},
    { key: 'logout', value: '退出'},
    { key: 'commit', value: '意见反馈'},
    { key: 'cls', value: '清空内容'},
    { key: 'hide', value: '隐藏终端'},
    { key: 'exit', value: '退出终端'}
  ]
  return (
    <>
      {
        helpList.map((item, index) => {
          return (
            <div className="help-item" key={index}>
              <span className="help-key">{item.key}</span>
              <span className="help-value">{item.value}</span>
            </div>
          )
        })
      }
    </>
  )
}

const errorTip = (code) => <div style={{color: 'red'}}>'{code}' is not recognized as a command</div>