package forms

import (
	"arks_servers/models"
)

type CreateTagForm struct {
	UserId uint   // 用户 ID
	Name   string // 标签
	Id     uint   // 分类id
}

type GetTagByUserForm struct {
	Id uint // user_id
}

type GetTagByCategoryForm struct {
	Id uint // category_id
}

// 绑定表单到实体结构
func (form CreateTagForm) BindToModel() models.Tag {
	return models.Tag{
		UserId:     form.UserId,
		CategoryId: form.Id,
		Name:       form.Name,
	}
}
