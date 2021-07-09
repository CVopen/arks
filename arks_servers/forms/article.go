package forms

import (
	"arks_servers/models"
	"arks_servers/utils"
)

// 新增文章表单
type CreateArticleForm struct {
	UserId           uint   `binding:"required" label:"用户id"`
	CategoryId       uint   `json:"category_id" binding:"required" label:"分类id"`
	OrderId          uint   `json:"order_id" label:"排序id"`
	TagList          []int  `json:"tagList" label:"标签"`
	IsTop            bool   `json:"is_top" label:"是否置顶"`
	IsAllowCommented bool   `json:"is_allow_commented" label:"是否允许评论"`
	Pwd              string `json:"pwd" label:"访问密码"`
	Title            string `json:"title" binding:"required" label:"文章标题"`
	Summary          string `json:"summary" binding:"required" label:"摘要"`
	Img              string `json:"img" label:"图片"`
	Content          string `json:"content" binding:"required" label:"内容"`
	MDContent        string `json:"md_content" binding:"required" label:"markdown渲染后内容"`
}

// 查询文章表单分页
type GetArticlePageForm struct {
	CategoryId       uint   `form:"category_id" label:"分类id"`
	TagList          []uint `form:"tagList" label:"标签"`
	Title            string `form:"title" label:"文章标题"`
	State            uint   `form:"state" label:"状态"`
	utils.Pagination        // 分页结构
}

func (create CreateArticleForm) BindToModel() models.Article {
	return models.Article{
		UserId:           create.UserId,
		CategoryId:       create.CategoryId,
		OrderId:          create.OrderId,
		IsTop:            create.IsTop,
		IsAllowCommented: create.IsAllowCommented,
		Pwd:              create.Pwd,
		Title:            create.Title,
		Summary:          create.Summary,
		Img:              create.Img,
		Content:          create.Content,
		MDContent:        create.MDContent,
		IsPublished:      create.UserId == 1,
	}
}

func (create GetArticlePageForm) BindToModel() models.Article {
	return models.Article{
		CategoryId: create.CategoryId,
		Title:      create.Title,
	}
}
