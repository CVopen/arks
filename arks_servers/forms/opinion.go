package forms

import (
	"arks_servers/models"

	"gorm.io/gorm"
)

// 创建意见表单
type OpinionCreateForm struct {
	UserId  uint   `label:"用户id"`
	Content string `json:"content" binding:"required" label:"内容"`
	Images  string `json:"images" label:"问题图片"`
}

// 查询意见表单
type OpinionGetForm struct {
	UserId uint `form:"user_id" binding:"required" label:"用户id"`
}

// 修改和删除表单
type OpinionEditAndDelForm struct {
	ID      uint   `json:"id" label:"意见id"`
	State   uint   `json:"state" label:"状态"`
	Message string `json:"message" label:"处理内容"`
}

// 绑定表单到实体结构
func (form OpinionCreateForm) BindToModel() models.Opinion {
	return models.Opinion{
		UserId:  form.UserId,
		Content: form.Content,
		Images:  form.Images,
	}
}

// 绑定表单到实体结构
func (form OpinionGetForm) BindToModel() models.Opinion {
	return models.Opinion{
		UserId: form.UserId,
	}
}

// 绑定表单到实体结构
func (form OpinionEditAndDelForm) BindToModel() models.Opinion {
	return models.Opinion{
		Model: gorm.Model{
			ID: form.ID,
		},
		State:   form.State,
		Message: form.Message,
	}
}
