import { get, post, put, del } from '../utils/request'

// 获取验证码base64
export const getCaptcha = () => get({
  url: '/captcha'
})

// 登录
export const login = ({ username, password, captcha_id, captcha_val }) => post({
  url: '/login',
    data: {
      username, // 用户名
      password,  // 密码
      captcha_id,  // 验证码 ID
      captcha_val // 验证码
    }
})

// 获取整站数据
export const getVisit = () => get({ url: '/config/visit' })
// 设置整站数据
export const editVisit = data => put({ url: '/config/edit', data })

// 添加分类
export const addCategory = ({ name, desc }) => post({
  url: '/category/add',
  data: {
    name, // 分类名
    desc
  }
})

// 修改分类
export const editCategory = ({ name, desc, id }) => put({
  url: '/category/edit',
  data: { name, desc, id }
})

// 分类列表
export const getCategoryList = params => get({ url: '/category/list', params })

// 删除分类
export const delCategory = ({ id }) => del({ url: '/category/del', data: { id } })

// 添加标签
export const addTag = ({ name, id }) => post({ url: '/tag/add',  data: { name, id } })

// 修改标签
export const editTag = ({ name, id }) => put({ url: '/tag/edit', data: { name, id } })

// 标签列表
export const getTagList = params => get({ url: '/tag/list', params })

// 删除标签
export const delTag = ({ id }) => del({ url: '/tag/del', data: { id } })

// 添加文章
export const addArcitle = data => post({ url: '/article/add', data })

// 获取文章
export const getArcitleList = params => get({ url: '/article/list', params })

// 发布文章
export const editPublish = ({ id ,state }) => put({ url: '/article/publish', data: { state, id } })

// 置顶文章
export const editTop = ({ id ,state }) => put({ url: '/article/top', data: { state, id } })

// 是否评论文章
export const editCommented = ({ id ,state }) => put({ url: '/article/comment', data: { state, id } })

// 是否回收
export const editRecovery = ({ id ,state }) => put({ url: '/article/recovery', data: { state, id } })

// 删除文章
export const delArticle = ({ id, ids }) => del({ url: '/article/del', data: { id, ids } })

// 文章详情
export const getArticleDetail = ({ id }) => get({ url: '/article/detail', params: { id } })

// 文章移动
export const moveOrder = ({ id, order_id, is_top, direction }) => put({
  url: '/article/move',
  data: { id, order_id, is_top, direction }
})

// 添加链接
export const addLinkList = data => post({ url: '/links/add', data })

// 工具列表
export const getToolsList = params => get({ url: '/links/tools/list', params })

// 友链列表
export const getFriendsList = params => get({ url: '/links/friends/list', params })

// 删除链接
export const delLink = ({ id, ids = []}) => del({ url: '/links/del', data: { id, ids } })

// 修改链接
export const editLinkList = data => put({ url: '/links/edit', data })
