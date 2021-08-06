import Container from './styled'
import { 
  CloseOutlined, 
  MinusOutlined, 
  FullscreenOutlined, 
  FullscreenExitOutlined, 
  FundViewOutlined
} from '@ant-design/icons'
import { useState, useEffect } from 'react'
import Command from './components/command'

export default function Terminal(props) {

  const [full, setFull] = useState(false)
  const [fullContainer, setFullContainerl] = useState(false)
  const [showHeader, changeShow] = useState(true)
  const changeFull = () => setFull(!full)

  useEffect(() => {

  }, [full, fullContainer, showHeader])

  return (
    <Container>
      <div className={['container-terminal', fullContainer && 'container-full'].join(' ')}>
        <div className={['terminal', full && 'full'].join(' ')}>
          <div className='terminal-header'>
            <CloseOutlined onClick={() => props.change(false)} />
            { full ? <FullscreenExitOutlined onClick={changeFull} /> : <FullscreenOutlined onClick={changeFull} /> }
            <MinusOutlined onClick={() => setFullContainerl(true)} />
          </div>
          <div className="terminal-content">
            {
              showHeader && (
              <div className="help">
                <h1>· Welcome to Ark ·</h1>
                <h2>· explain</h2>
                <p>This is the ark terminal. You can type 'help' to know more. Enter a maximum length of 10.</p>
              </div>
              )
            }
            <Command full={fullContainer} set={setFullContainerl} showHeader={changeShow} close={props.change} />
          </div>
        </div>
      </div>
      <div className={['circular', 'circularTerminal', fullContainer && 'circular-full'].join(' ')} onClick={() => setFullContainerl(false)}>
        <FundViewOutlined />
      </div>
    </Container>
  )
}