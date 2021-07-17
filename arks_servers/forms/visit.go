package forms

import "arks_servers/models"

type VisitForm struct{}

// 绑定表单到实体结构
func (form VisitForm) BindToModel() models.Statistics {
	return models.Statistics{}
}
