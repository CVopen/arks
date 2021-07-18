package forms

import "arks_servers/models"

// 获取
type VisitForm struct{}

type VisitEditForm struct {
	Notice      string `json:"notice" binding:"required" label:"公告"`
	HomeImg     string `json:"home_img" binding:"required" label:"首页背景图"`
	CategoryImg string `json:"category_img" binding:"required" label:"分类背景图"`
	TagImg      string `json:"tag_img" binding:"required" label:"标签背景图"`
	ToolsImg    string `json:"tools_img" binding:"required" label:"工具背景图"`
	FriendsImg  string `json:"friends_img" binding:"required" label:"友链背景图"`
	ClientImg   string `json:"client_img" binding:"required" label:"客户端背景图"`
}

// 绑定表单到实体结构
func (form VisitForm) BindToModel() models.Statistics {
	return models.Statistics{}
}

func (form VisitEditForm) BindToModel() models.Statistics {
	return models.Statistics{
		Notice:      form.Notice,
		HomeImg:     form.HomeImg,
		CategoryImg: form.CategoryImg,
		TagImg:      form.TagImg,
		ToolsImg:    form.ToolsImg,
		FriendsImg:  form.FriendsImg,
		ClientImg:   form.ClientImg,
	}
}
