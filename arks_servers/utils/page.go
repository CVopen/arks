package utils

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// 分页默认参数
var (
	defaultPageSize    uint = 10 // 默认每页条数
	defaultCurrentPage uint = 1  // 默认页码
)

// 分页结构体
type Pagination struct {
	Size      uint        `form:"pageSize"`   // 每页条数
	Page      uint        `form:"page"`       // 页码
	StartTime string      `form:"start_time"` // 开始时间
	EndTime   string      `form:"end_time"`   // 开始时间
	Data      interface{} // 分页数据
	Total     uint        // 总数
	lastMore  bool        // 总页数
}

// 分页
func ToPage(p *Pagination, db *gorm.DB, list interface{}) (uint, error) {
	// 设置默认参数
	if p.Size < 1 {
		p.Size = defaultPageSize
	}
	if p.Page < 1 {
		p.Page = defaultCurrentPage
	}

	// 获取全部搜索数量
	var total int64
	err := db.Count(&total).Error
	if err != nil {
		return 0, err
	}
	// 获取偏移量数据
	offset := p.Size * (p.Page - 1)

	if p.StartTime != "" {
		db.Where("`created_at` between ? and ?", p.StartTime, p.EndTime)
	}

	err = db.Limit(int(p.Size)).Offset(int(offset)).Order("created_at desc").Find(list).Error

	if err != nil {
		return 0, err
	}
	return uint(total), err
}

// 封装分页数据
func PageData(list interface{}, total uint, page Pagination) gin.H {
	if total > page.Size*page.Page {
		page.lastMore = true
	}

	// 返回map
	return gin.H{
		"data":     list,
		"page":     page.Page,
		"pageSize": page.Size,
		"lastMore": page.lastMore,
		"total":    total,
	}
}
