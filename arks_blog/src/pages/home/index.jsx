import React, { Component } from 'react'
import style from './index.module.scss'
import './index.scss'
import Mask from '@/components/maskImg'
import PageTitle from '@/components/pageTitile'
import Info from '@/components/info'
import Notice from '@/components/notice'
import NewArticle from '@/components/newArticle'
import Article from './components/ArticleContent'

export default class Home extends Component{
  render() {
    return (
      <div className={style.home}>
        <Mask />
        <div className="content">
          <div className="left">
            <PageTitle title="全部文章" src='home' text="记录学习过程中的一些笔记" />
            <Article />
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
