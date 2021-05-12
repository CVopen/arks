import { Stage, Layer, Rect, Circle } from 'react-konva';
import Konva from 'konva';
import style from './index.module.scss'
import { Component } from 'react';
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
    const { FromCom } = this.props
    return (
      <div className={style.login}>
        <div className={style.from}>
          <FromCom />
        </div>
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
