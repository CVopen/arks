/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { CloudUploadOutlined } from '@ant-design/icons'
import './index.scss'

export default function Center (props) { 
  let canvas
  const [ src, setSrc ] = useState('')
  const [ size, setSize ] = useState(null)
  useEffect(() => {
    const container = document.querySelector('.container')
    setSize({
      width: parseInt(getComputedStyle(container).width),
      height: parseInt(getComputedStyle(container).height)
    })
    setTimeout(() => {
      console.log(size);
    }, 2000);
  }, [])

  const change = e => {
    console.log(e.target.files[0]);
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = e => {
      const img = new Image()
      img.src = e.target.result
      setSrc(e.target.result)
      img.onload = function () {
        let x, y, w, h
        if (img.width / img.height > size.width / size.height) {
          w = size.width
          h = w * img.height / img.width
          x = 0
          y = (size.height - h) / 2
        } else if (img.width / img.height === size.width / size.height) {
          x = y = 0
          w = size.width
          h = size.height
        } else {
          h = size.height
          w = h * img.width / img.height
          y = 0
          x = (size.width - w) / 2
        }
        canvas = document.querySelector('canvas').getContext("2d")
        drawBg(10, size.width, size.height)
        canvas.drawImage(this, x, y, w, h)
        setSrc(document.querySelector('canvas').toDataURL())
      }
    }
  }

  const drawLine = (x1, y1, x2, y2, color) => {
    canvas.beginPath()
    canvas.rect(x1, y1, x2, y2)
    canvas.strokeStyle = color
    canvas.stroke() // 着色
    canvas.fillStyle = color
    canvas.fill()
    // 结束路径
    canvas.closePath()
  }

  const drawBg = (size, w, h) => {
    const width = parseInt(w / size)
    const height = parseInt(h / size)
    let color1 = '#7b7b7b'
    let color2 = '#676767'
    for (let i = 0; i < width; i++) {
      if (height % 2 === 0) {
        [ color1, color2 ] = [color2 , color1 ]
      }
      for (let j = 0; j < height; j++) {
        [ color1, color2 ] = [color2 , color1 ]
        if (i === 0) {
          console.log(i * size, j * size, size, size,color1);
        }
        drawLine(i * size, j * size, size, size, color1)
      }
    }
    
    if (w > width * size) {
      if (canvas.getImageData(1,1, 1, 1).data[0] === canvas.getImageData(width * size - size, 1, 1, 1).data[0]) {
        color1 = '#7b7b7b'
        color2 = '#676767'
      } else {
        color2 = '#7b7b7b'
        color1 = '#676767'
      }
      const patchW = w - width * size
      for (let index = 0; index < height; index++) {
        [ color1, color2 ] = [color2 , color1 ]
        drawLine(width * size, index * size, patchW, size, color1)
      }

      if (canvas.getImageData(1,1, 1, 1).data[0] === canvas.getImageData(height * size - size, 1, 1, 1).data[0]) {
        color1 = '#7b7b7b'
        color2 = '#676767'
      } else {
        color2 = '#7b7b7b'
        color1 = '#676767'
      }
      const patchH = h - height * size
      for (let index = 0; index < width; index++) {
        [ color1, color2 ] = [color2 , color1 ]
        drawLine(index * size, height * size, size, patchH, color1)
      }

      [ color1, color2 ] = [color2 , color1 ]
      drawLine(width * size, height * size, patchW, patchH, color1)
    }
  }

  const importImg = () => {
    const a = document.createElement("a");
    a.href = src
    a.download = '123.png';
    a.click();
  }

  return (
    <div className='cropper'>
      <div className='container'>
        {
          src ?
          <canvas width={size.width} height={size.height} /> :
          <>
            <input type="file" onChange={change} />
            <CloudUploadOutlined/>
          </>
        }
      </div>
      <div onClick={() => setSrc('')}>清空</div>
      <div onClick={importImg}>导出</div>
    </div>
  )
}