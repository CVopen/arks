package forms

import (
	"arks_servers/models"

	"gorm.io/gorm"
)

type CreateCategoryForm struct {
	Name string
	Desc string
}

type CategoryByNameForm struct {
	Name string
	Id   uint
}

type CategoryInfoForm struct {
	UserId uint
	Name   string
	Id     uint
	Desc   string
}

type CategoryIdForm struct {
	Id uint
}

type CategoryIdListForm struct{}

// 绑定表单到实体结构
func (form CreateCategoryForm) BindToModel() models.Category {
	return models.Category{
		Name: form.Name,
		Desc: form.Desc,
	}
}

func (form CategoryByNameForm) BindToModel() models.Category {
	return models.Category{
		Name:   form.Name,
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
