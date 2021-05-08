import { Component } from 'react'
import style from './index.module.scss'
import Mask from '../../components/maskImg'
export default class Home extends Component{
  render() {
    return (
      <div className={style.home}>
        <Mask height={true} text={"这是扽轮毂也"} />
        <img src="http://p1.music.126.net/EZ9ynoa6iQTTRCR7lvPjng==/109951165942028815.jpg?imageView&quality=89" alt="a" />
        <img src="http://p1.music.126.net/EZ9ynoa6iQTTRCR7lvPjng==/109951165942028815.jpg?imageView&quality=89" alt="a" />
        <img src="http://p1.music.126.net/EZ9ynoa6iQTTRCR7lvPjng==/109951165942028815.jpg?imageView&quality=89" alt="a" />
      </div>
    )
  }
}
