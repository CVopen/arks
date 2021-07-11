package forms

import (
	"arks_servers/models"
	"arks_servers/utils"

	"gorm.io/gorm"
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

// 发布文章表单
// 文章置顶表单
// 文章评论表单
// 回收文章表单
// 删除文章表单
type PuTArticleForm struct {
	ID    uint `json:"id" binding:"required" label:"文章ID"`
	State bool `json:"state" label:"是否发布"`
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

func (put PuTArticleForm) BindToModelPublish() models.Article {
	return models.Article{
		Model:       gorm.Model{ID: put.ID},
		IsPublished: put.State,
	}
}

func (put PuTArticleForm) BindToModelTop() models.Article {
	return models.Article{
		Model: gorm.Model{ID: put.ID},
		IsTop: put.State,
	}
}

func (put PuTArticleForm) BindToModelComment() models.Article {
	return models.Article{
		Model:            gorm.Model{ID: put.ID},
		IsAllowCommented: put.State,
	}
}

func (put PuTArticleForm) BindToModelRecycled() models.Article {
	return models.Article{
		Model:      gorm.Model{ID: put.ID},
		IsRecycled: put.State,
	}
}

func (del PuTArticleForm) BindToModelDel() models.Article {
	return models.Article{
		Model: gorm.Model{ID: del.ID},
	}
}
