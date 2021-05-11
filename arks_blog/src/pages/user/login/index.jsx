import style from './index.module.scss'
import { Component, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Circle } from 'react-konva';
import InputCom from './components/input'
import Konva from 'konva';
import { getCaptcha } from '../../../api/auth'
 function LoginCom() {
  const inputChange = (e) => {
    console.log(e);
  }
  const [ imgSrc, setImgSrc ] = useState('')
  useEffect(() => {
    captcha()
  }, [])

  const captcha = () => {
    getCaptcha().then(res => {
      setImgSrc(res.data.captcha_url)
    })
  }
  return (
    <div className={style.from}>
      <span className={style.title}>登录</span>
      <InputCom 
        onChange={inputChange}
        type="text"
        placeholder="账号"
        clear
      />
      <InputCom 
        onChange={inputChange}
        type="password"
        placeholder="密码"
      />
      <div className={style.code}>
        <div className={style.inputCode}>
          <InputCom 
            onChange={inputChange}
            type="text"
            placeholder="验证码"
          />
        </div>
        <img src={imgSrc}  onClick={captcha} alt="" />
      </div>
    </div>
  )
}

export default class ColoredRect extends Component {
  state = {
    color: 'green'
  };
  handleClick = () => {
    console.log(123);
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };
  render() {
    return (
      <div className={style.login}>
        <LoginCom />
        <Stage 
          width={window.innerWidth} 
          height={window.innerHeight}
        >
          <Layer>
            <Circle
              x={25}
              y={250}
              width={50}
              height={50}
              fill={this.state.color}
              shadowBlur={5}
              onTouchEnd={this.handleClick}
              onTap={this.handleClick}
              onClick={this.handleClick}
            />
            <RectCom />
          </Layer>
        </Stage>
      </div>
    );
  }
}

function RectCom () {
  return (
    <Rect
      x={200}
      y={20}
      width={20}
      height={20}
      fill={'red'}
      shadowBlur={5}
      onClick={() => console.log(123)}
    />
  )
}
