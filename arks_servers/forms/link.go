package forms

import (
	"arks_servers/models"
	"arks_servers/utils"

	"gorm.io/gorm"
)

type LinkForm struct {
	UserId      uint   `json:"user_id" label:"用户id"`
	Id          uint   `json:"id" label:"链接id"`
	Name        string `json:"name" binding:"required" label:"名称"`
	Url         string `json:"url" binding:"required" label:"地址"`
	Desc        string `json:"desc" binding:"required" label:"描述"`
	Icon        string `json:"icon" binding:"required" label:"图标"`
	Type        uint   `json:"type" binding:"required" label:"链接类型"`
	IsRecycled  bool   `json:"is_recycled" label:"是否加入回收站"`
	IsPublished bool   `json:"is_published" label:"是否发布"`
}

type LinkDelForm struct {
	UserId uint   `json:"user_id" label:"用户id"`
	Id     uint   `json:"id" binding:"required" label:"链接id"`
	Ids    []uint `json:"ids" label:"链接id组"`
}

type LinkGetList struct {
	UserId           uint   `label:"用户id"`
	Name             string `form:"name" label:"名称"`
	State            uint   `form:"state" label:"状态"`
	utils.Pagination        // 分页结构
}

// 绑定表单到实体结构
func (form LinkForm) BindToModel() models.Link {
	return models.Link{
		UserId:      form.UserId,
		Name:        form.Name,
		Url:         form.Url,
		Desc:        form.Desc,
		Icon:        form.Icon,
		Type:        form.Type,
		IsRecycled:  form.IsRecycled,
		IsPublished: form.IsPublished,
	}
}

// 绑定表单到实体结构
func (form LinkDelForm) BindToModel() models.Link {
	return models.Link{
		Model:  gorm.Model{ID: form.Id},
		UserId: form.UserId,
	}
}

// 绑定表单到实体结构
func (form LinkGetList) BindToModel() models.Link {
	return models.Link{
		UserId: form.UserId,
		Name:   form.Name,
	}
}
