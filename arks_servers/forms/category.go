package forms

import "arks_servers/models"

type CategoryAllForm struct{}

type CreateCategoryForm struct {
	Name string
}

// 绑定表单到实体结构
func (form CategoryAllForm) BindToModel(id uint) models.Category {
	return models.Category{
		UserId: id,
	}
}

func (form CreateCategoryForm) BindToModel(id uint) models.Category {
	return models.Category{
		UserId: id,
		Name:   form.Name,
	}
}
