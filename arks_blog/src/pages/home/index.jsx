import React, { Component } from 'react'
import style from './index.module.scss'
import './index.scss'
import Mask from '../../components/maskImg'
import { Card } from 'antd'
import Info from '@/components/info'
import Notice from '@/components/notice'
import NewArticle from '@/components/newArticle'

export default class Home extends Component{
  render() {
    return (
      <div className={style.home}>
        <Mask />
        <div className="content">
          <div className="left">
            <Card hoverable className="cart">
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </div>
          <div className="right">
            <Info history={this.props.history} />
            <Notice />
            <NewArticle />
          </div>
        </div>
      </div>
    )
  }
}
