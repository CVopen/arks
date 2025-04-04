package models

import (
	"arks_servers/config/db"
	"arks_servers/utils"

	"gorm.io/gorm"
)

// 分类
type Category struct {
	gorm.Model
	Name string `gorm:"unique;type:varchar(30);not null;" json:"name"` // 类别名称
	// User   User   `gorm:"ForeignKey:UserId" json:"user"`           // 用户
	Count  uint   `gorm:"unique_index;type:int;default:0;" json:"count"` // 文章数量
	UserId uint   `gorm:"type:int;not null;" json:"user_id"`             // 用户id
	Desc   string `gorm:"type:varchar(255);not null;" json:"desc"`       // 介绍
}

// 获取用户下的所有分类
func (c Category) GetAllList(page *utils.Pagination) ([]Category, uint, error) {
	var categoryList []Category

	// 创建语句
	// query := db.Db.Model(&Category{}).Where("`user_id` = ?", c.UserId)
	query := db.Db.Model(&Category{})

	if c.Name != "" {
		query = query.Where("`name` like concat('%',?,'%')", c.Name)
	}

	// 分页
	total, err := utils.ToPage(page, query, &categoryList)

	return categoryList, total, err
}

// 添加分类
func (c Category) Create() error {
	// 事务开始
	tx := db.Db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	if err := tx.Error; err != nil {
		return err
	}

	err := tx.Create(&c).Error
	if err != nil {
		tx.Rollback()
		return err
	}

	statistics, err := GetStatistics()
	if err != nil {
		tx.Rollback()
		return err
	}
	err = statistics.EditStatistics(map[string]interface{}{
		"CCount": statistics.CCount + 1,
	}, tx)
	if err != nil {
		tx.Rollback()
		return err
	}
	// 日志更新
	go CreateFunc(c.UserId, "新增分类", c.Name)

	return tx.Commit().Error
}

// 验证分类名是否存在
func (c Category) GetCategoryByName() ([]Category, error) {
	var categoryList []Category
	err := db.Db.Where("`name` = ? ", c.Name).Find(&categoryList).Error
	return categoryList, err
}

// 修改分类
func (c Category) EditCategory() error {
	// 使用 map 来更新，避免 gorm 默认不更新值为 nil, false, 0 的字段
	return db.Db.Model(&c).
		Updates(map[string]interface{}{
			"name": c.Name,
			"desc": c.Desc,
		}).Error
}

// 删除分类
func (c Category) RemoveCategory() error {
	// 事务开始
	tx := db.Db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	if err := tx.Error; err != nil {
		return err
	}

	// 获取分类下所有标签id
	var list []Tag
	if err := tx.Table("tags").Where("`category_id` = ?", c.ID).Find(&list).Error; err != nil {
		tx.Rollback()
		return err
	}

	// 获取分类对应用户id
	db.Db.First(&c)

	idList := make([]uint, len(list))

	for index, v := range list {
		idList[index] = v.ID
	}

	// 删除标签文章表中的记录
	err := tx.Exec("delete from `tag_article` where `tag_id` in (?)", idList).Error
	if err != nil {
		tx.Rollback()
		return err
	}

	// 获取删除标签数目和文章数目
	var totalT, totalA int64
	if err = tx.Model(&Tag{}).Where("category_id = ?", c.ID).Count(&totalT).Error; err != nil {
		tx.Rollback()
		return err
	}

	if err = tx.Model(&Article{}).Where("category_id = ?", c.ID).Count(&totalA).Error; err != nil {
		tx.Rollback()
		return err
	}

	// 删除分类下所有标签
	if err := tx.Unscoped().Where("category_id = ?", c.ID).Delete(&Tag{}).Error; err != nil {
		tx.Rollback()
		return err
	}

	// 删除分类下所有文章
	if err := tx.Unscoped().Where("category_id = ?", c.ID).Delete(&Article{}).Error; err != nil {
		tx.Rollback()
		return err
	}

	// 删除分类
	if err := tx.Unscoped().Where("`id` = ?", c.ID).Delete(&Category{}).Error; err != nil {
		tx.Rollback()
		return err
	}

	statistics, err := GetStatistics()
	if err != nil {
		return err
	}
	err = statistics.EditStatistics(map[string]interface{}{
		"CCount": statistics.CCount - 1,
		"TCount": statistics.TCount - uint(totalT),
		"ACount": statistics.ACount - uint(totalA),
	}, tx)

	if err != nil {
		return err
	}

	// 日志更新
	go CreateFunc(c.UserId, "删除分类", c.Name)

	return tx.Commit().Error
}

// 批量删除
func (c Category) RemoveBatchCategory(list []uint) error {
	// 事务开始
	tx := db.Db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	if err := tx.Error; err != nil {
		return err
	}

	var categoryList []Category
	db.Db.Model(&Category{}).Where("id in (?)", list).Find(&categoryList)

	// 获取分类下所有标签id
	var listTag []Tag
	if err := tx.Table("tags").Where("`category_id` in (?)", list).Find(&listTag).Error; err != nil {
		tx.Rollback()
		return err
	}

	idList := make([]uint, len(listTag))

	for index, v := range listTag {
		idList[index] = v.ID
	}

	var totalT, totalA int64
	if err := tx.Model(&Tag{}).Where("category_id in (?)", list).Count(&totalT).Error; err != nil {
		tx.Rollback()
		return err
	}

	if err := tx.Model(&Article{}).Where("category_id in (?)", list).Count(&totalA).Error; err != nil {
		tx.Rollback()
		return err
	}

	// 删除标签文章表中的记录
	err := tx.Exec("delete from `tag_article` where `tag_id` in (?)", idList).Error
	if err != nil {
		tx.Rollback()
		return err
	}

	// 删除分类下所有标签
	if err := tx.Unscoped().Where("category_id in (?)", list).Delete(&Tag{}).Error; err != nil {
		tx.Rollback()
		return err
	}

	// 删除分类下所有文章
	if err := tx.Unscoped().Where("category_id in (?)", list).Delete(&Article{}).Error; err != nil {
		tx.Rollback()
		return err
	}

	// 删除分类
	if err := tx.Unscoped().Delete(&Category{}, list).Error; err != nil {
		tx.Rollback()
		return err
	}

	statistics, err := GetStatistics()
	if err != nil {
		return err
	}

	err = statistics.EditStatistics(map[string]interface{}{
		"CCount": statistics.CCount - uint(len(list)),
		"TCount": statistics.TCount - uint(totalT),
		"ACount": statistics.ACount - uint(totalA),
	}, tx)

	if err != nil {
		tx.Rollback()
		return err
	}

	go func() {
		for _, v := range categoryList {
			// 日志更新
			go CreateFunc(v.UserId, "批量删除分类", v.Name)
		}
	}()

	return tx.Commit().Error
}
