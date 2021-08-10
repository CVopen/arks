package forms

import (
	"arks_servers/models"
	"arks_servers/utils"

	"gorm.io/gorm"
)

// 创建记录
type HistoryForm struct {
	UserId uint `label:"用户id"`
	AId    uint `label:"文章id"`
}

// 获取历史记录
type GetHistoryForm struct {
	UserId           uint `label:"用户id"`
	utils.Pagination      // 分页结构
}

// 获取历史记录
type DelHistoryForm struct {
	ID uint `json:"id" binding:"required" label:"用户id"`
}

// 绑定到实体表单结构
func (form HistoryForm) BindToModel() models.History {
	return models.History{
		UserId:    form.UserId,
		ArticleId: form.AId,
	}
}

// 绑定到实体表单结构
func (form GetHistoryForm) BindToModel() models.History {
	return models.History{
		UserId: form.UserId,
	}
}

// 绑定到实体表单结构
func (form DelHistoryForm) BindToModel() models.History {
	return models.History{
		Model: gorm.Model{ID: form.ID},
	}
}
