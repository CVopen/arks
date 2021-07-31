import { get } from '../utils/request'

// 获取最新文章
export const getNewArticle = ({ limit }) => get({
  url: '/article/new',
  params: { limit }
})

// 获取文章列表
export const getArticleList = params => get({
  url: '/article/list',
  params
})

// 获取文章详情
export const getArticleDetail = ({ id }) => get({
  url: 'article/detail',
  params: { id }
})

// 获取分类文章列表
export const getArticleCategoryList = params => get({
  url: '/article/category',
  params
})

// 获取标签文章列表
export const getArticleTagList = params => get({
  url: '/article/tag',
  params
})