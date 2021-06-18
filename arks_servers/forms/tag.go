package forms

import (
	"arks_servers/models"
)

type CreateTagForm struct {
	Name string
}

type GetTagByUserForm struct {
	Id uint
}

type GetTagByCategoryForm struct {
	Id uint
}

// 绑定表单到实体结构
func (form CreateTagForm) BindToModel() models.Tag {
	return models.Tag{
		Name: form.Name,
	}
}

func (form GetTagByCategoryForm) BindToModel() models.Category {
	return models.Category{
		UserId: form.Id,
	}
}

func (form GetTagByUserForm) BindToModel() models.Category {
	return models.Category{
		UserId: form.Id,
	}
}
