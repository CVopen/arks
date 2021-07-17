package forms

import "arks_servers/models"

// 创建日志表单
type JournalForm struct {
	UserId  uint   // 用户id
	Content string // 内容
}

// 绑定表单到实体结构
func (form JournalForm) BindToModel() models.Journal {
	return models.Journal{
		UserId:  form.UserId,
		Content: form.Content,
	}
}
