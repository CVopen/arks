import Container from './styled'
import { CloseOutlined, MinusOutlined, FullscreenOutlined, FullscreenExitOutlined, FundViewOutlined } from '@ant-design/icons'
import { useState } from 'react'

export default function PageTitle(props) {

  const [full, setFull] = useState(false)
  const [fullContainer, setFullContainerl] = useState(false)
  const changeFull = () => setFull(!full)

  return (
    <Container>
      <div className={['container', fullContainer && 'container-full'].join(' ')}>
        <div className={['terminal', full && 'full'].join(' ')}>
          <div className='header'>
            <CloseOutlined onClick={() => props.change(false)} />
            { full ? <FullscreenExitOutlined onClick={changeFull} /> : <FullscreenOutlined onClick={changeFull} /> }
            <MinusOutlined onClick={() => setFullContainerl(true)} />
          </div>
          <div className="terminal-content">
            <div className="help">
              <h1>· Welcome to Ark ·</h1>
              <h2>· explain</h2>
              <p>This is the ark terminal. You can type 'help' to know more.</p>
            </div>
            123
          </div>
        </div>
      </div>
      
      <div className={['circular', fullContainer && 'circular-full'].join(' ')} onClick={() => setFullContainerl(false)}>
        <FundViewOutlined />
      </div>
    </Container>
  )
}