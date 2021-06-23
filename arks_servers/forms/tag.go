package forms

import (
	"arks_servers/models"
	"arks_servers/utils"

	"gorm.io/gorm"
)

type CreateTagForm struct {
	UserId uint   // 用户 ID
	Name   string // 标签
	Id     uint   // 分类id
}

type GetTagByUserForm struct {
	Id   uint   // user_id
	Name string // tag名称
}

type EditTagForm struct {
	UserId uint // user_id
	// Id     uint   // tag_id
	// Name   string // tag名称
	Name string `json:"name" binding:"min=1,max=30" label:"tag名称"`
	Id   uint   `json:"id" binding:"min=1,max=30" label:"tag_id"`
}

type DelTagByIdForm struct {
	Id uint // tag_id
}

type DelTagByListForm struct{}

// 分类分页表单
type TagPageForm struct {
	Name             string `form:"name"` // 关键词
	UserId           uint   // 用户id
	utils.Pagination        // 分页结构
}

// 绑定表单到实体结构
func (form CreateTagForm) BindToModel() models.Tag {
	model := models.Tag{
		UserId:     form.UserId,
		CategoryId: form.Id,
		Name:       form.Name,
	}
	return model
}

func (form GetTagByUserForm) BindToModel() models.Tag {
	return models.Tag{
		UserId: form.Id,
		Name:   form.Name,
	}
}

func (form EditTagForm) BindToModel() models.Tag {
	return models.Tag{
		Model:  gorm.Model{ID: form.Id},
		UserId: form.UserId,
		Name:   form.Name,
	}
}

func (form DelTagByIdForm) BindToModel() models.Tag {
	return models.Tag{
		Model: gorm.Model{ID: form.Id},
	}
}

func (form DelTagByListForm) BindToModel() models.Tag {
	return models.Tag{}
}

func (form TagPageForm) BindToModel() models.Tag {
	return models.Tag{
		Name:   form.Name,
		UserId: form.UserId,
	}
}
