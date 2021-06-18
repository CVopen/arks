package forms

import (
	"arks_servers/models"
)

type CreateCategoryForm struct {
	Name string
	Desc string
}

type GetCategoryForm struct {
	Id uint
}

// 绑定表单到实体结构
func (form CreateCategoryForm) BindToModel() models.Category {
	return models.Category{
		Name: form.Name,
		Desc: form.Desc,
	}
}

func (form GetCategoryForm) BindToModel() models.Category {
	return models.Category{
		UserId: form.Id,
	}
}
