/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import bus from '@utils/bus'
import { random } from '@utils/utils'

let id = null

export default function Comicwidget () {
  const [ size, setSize ] = useState({width: document.body.clientWidth, height: document.body.clientHeight})
  useEffect(() => {
    id = null
    init()
    bus.on('offsetWidth', () => {
      if (size.width !== document.body.clientWidth || size.height !== document.body.clientHeight) {
        cancelAnimationFrame(id)
        setTimeout(() => {
          setSize({width: document.body.clientWidth, height: document.body.clientHeight})
          init()
        }, 100)
      }
    })
    return componentWillUnmount
  }, [])

  const init = () => {
    const canvas = document.querySelector('.comicwidge').firstChild
    canvas.width = size.width
    canvas.height = size.height
    const ctx = canvas.getContext('2d')
    const arr = []
    for (let index = 0; index < 20; index++) {
      arr.push(new Ball(ctx))
    }
    animation(ctx, arr)
  }

  const animation = (ctx, arr) => {
    ctx.clearRect(0, 0, size.width, size.height)
    for (let index = 0; index < arr.length; index++) {
      arr[index].drawCircle()
    }
    id = requestAnimationFrame(()=>animation(ctx, arr))
  }

  const componentWillUnmount = () => {
    bus._events.offsetWidth.pop()
    cancelAnimationFrame(id)
  }

  return  <div className="comicwidge">
            <canvas style={{position: 'fixed', left: 0, top: 0}} />
          </div>
}

class Ball{
  constructor(ctx) {
    this.ctx = ctx
    this.x = random(document.body.clientWidth - 100) + 50
    this.y = random(document.body.clientHeight - 100) + 50
    this.r = random(40) + 10
    this.xSpeed = random(5) + 1 // [0 - 9]
    this.ySpeed = random(5) + 1 // [0 - 9]
    this.color = '#' + parseInt(random(0xffffff)).toString(16)
  }
  drawCircle() {
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    this.ctx.fillStyle = this.color
    this.ctx.fill()
    this.run()
  }
  run() {
    if (this.x - this.r <= 0 || this.x + this.r >= document.body.clientWidth) {
      this.xSpeed = -this.xSpeed
    }
    if (this.y - this.r <= 0 || this.y + this.r >= document.body.clientHeight) {
      this.ySpeed = -this.ySpeed
    }
    this.x += this.xSpeed
    this.y += this.ySpeed
  }
}