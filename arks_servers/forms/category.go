package forms

import (
	"arks_servers/models"

	"gorm.io/gorm"
)

type CreateCategoryForm struct {
	Name string `json:"name" binding:"required,min=1,max=30" label:"类别名称"`
	Desc string `json:"desc" binding:"required,min=1,max=255" label:"简介"`
	Id   uint
}

type CategoryInfoForm struct {
	UserId uint
	Name   string `json:"name" binding:"min=1,max=30" label:"类别名称"`
	Id     uint   `json:"id" binding:"min=1,max=30" label:"类别id"`
	Desc   string `json:"desc" binding:"min=1,max=255" label:"简介"`
}

type CategoryIdForm struct {
	Id uint `json:"id" binding:"required,min=1,max=30" label:"类别id"`
}

type CategoryIdListForm struct{}

// 绑定表单到实体结构
func (form CreateCategoryForm) BindToModel() models.Category {
	return models.Category{
		Name:   form.Name,
		Desc:   form.Desc,
		UserId: form.Id,
	}
}

func (form CategoryIdForm) BindToModel() models.Category {
	return models.Category{
		Model: gorm.Model{ID: form.Id},
	}
}

func (form CategoryInfoForm) BindToModel() models.Category {
	return models.Category{
		Name:   form.Name,
		Model:  gorm.Model{ID: form.Id},
		Desc:   form.Desc,
		UserId: form.UserId,
	}
}

func (form CategoryIdListForm) BindToModel() models.Category {
	return models.Category{}
}
