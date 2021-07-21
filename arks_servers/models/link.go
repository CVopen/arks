package models

import (
	"arks_servers/config/db"
	"arks_servers/utils"
	"fmt"

	"gorm.io/gorm"
)

// 友链和工具
type Link struct {
	gorm.Model
	User        User   `gorm:"ForeignKey:UserId;not null;" json:"user"`      // 用户
	UserId      uint   `json:"user_id"`                                      // 用户id
	Name        string `gorm:"type:varchar(100); not null;" json:"name"`     // 名称
	Url         string `gorm:"type:varchar(255); not null;" json:"url"`      // 地址
	Desc        string `gorm:"type:varchar(255); not null;" json:"desc"`     // 描述
	Icon        string `gorm:"type:varchar(255); not null;" json:"icon"`     // 图标
	Type        uint   `gorm:"type:int; defalut:1;" json:"type"`             // 1 友链 2工具
	IsRecycled  bool   `gorm:"type:bool; default:false;" json:"is_recycled"` // 是否加入回收站
	IsPublished bool   `gorm:"type:bool; default:false" json:"is_published"` // 是否通过审核
}

// 根据name查找链接
func (link Link) FindLink() (Link, error) {
	var l Link
	err := db.Db.Where("name = ? and type = ?", link.Name, link.Type).First(&l).Error
	return l, err
}

// 创建链接
func (link Link) Create() (err error) {
	if err = db.Db.Create(&link).Error; err == nil {
		// 日志更新
		str := "新增友链"
		if link.Type == 2 {
			str = "新增工具链接"
		}
		go CreateFunc(link.UserId, str, link.Name)
	}

	return
}

// 分页查找链接
func (link Link) GetLinks(page *utils.Pagination, state uint, typeLink uint) (list []Link, total uint, err error) {
	query := db.Db.Model(&Link{})

	if link.UserId > 0 {
		query = query.Where("`user_id` = ?", link.UserId)
	}

	if link.Name != "" {
		query = query.Where("`name` = ?", link.Name)
	}

	switch state {
	case 1:
		// 已发布
		query = query.Where("is_published = 1 and is_recycled = 0")
	case 2:
		// 未发布
		query = query.Where("is_published = 0 and is_recycled = 0")
	case 3:
		// 回收站
		query = query.Where("is_recycled = 1")
	default:
		break
	}

	switch typeLink {
	case 1:
		// 友链
		query = query.Where("type = 1")
	case 2:
		// 工具
		query = query.Where("type = 2")
	default:
		break
	}

	total, err = utils.ToPage(page, query, &list)
	return
}

// 删除单个链接
func (link Link) DelLink() (err error) {
	db.Db.First(&link)
	err = db.Db.Unscoped().Delete(&link).Error
	if err == nil {
		// 日志更新
		str := "删除友链"
		if link.Type == 2 {
			str = "删除工具链接"
		}
		go CreateFunc(link.UserId, str, link.Name)
	}
	return
}

// 批量删除链接
func (Link) DelLinkList(ids []uint) (err error) {
	var list []Link
	db.Db.Where("id in (?)", ids).Find(&list)
	err = db.Db.Unscoped().Where("id in (?)", ids).Delete(&Link{}).Error
	if err == nil {
		// 日志更新
		str := "删除友链"
		if list[0].Type == 2 {
			str = "删除工具链接"
		}
		for _, v := range list {
			go CreateFunc(v.UserId, str, v.Name)

		}
	}
	return
}

// 更新链接
func (link Link) UpdateLink() (err error) {
	fmt.Println(link)
	err = db.Db.Model(&link).Updates(map[string]interface{}{
		"name":         link.Name,
		"url":          link.Url,
		"desc":         link.Desc,
		"icon":         link.Icon,
		"type":         link.Type,
		"is_recycled":  link.IsRecycled,
		"is_published": link.IsPublished,
	}).Error

	if err == nil {
		// 日志更新
		str := "更新友链"
		if link.Type == 2 {
			str = "更新工具链接"
		}
		go CreateFunc(link.UserId, str, link.Name)
	}
	return
}
