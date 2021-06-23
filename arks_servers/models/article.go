package models

import (
	"gorm.io/gorm"
)

// 文章
type Article struct {
	gorm.Model
	User             User     `gorm:"ForeignKey:UserId;not null;" json:"user"`           // 用户
	UserId           uint     `json:"user_id"`                                           // 用户id
	Category         Category `gorm:"ForeignKey:CategoryId" json:"category"`             // 分类
	CategoryId       uint     `json:"category_id"`                                       // 分类id
	OrderId          uint     `gorm:"type:int;default:0;" json:"order_id"`               // 排序id
	TagList          []Tag    `gorm:"many2many:tag_article;" json:"tag_list"`            // 标签列表
	IsTop            bool     `gorm:"type:bool;defalut:false;" json:"is_top"`            // 是否置顶
	IsRecycled       bool     `gorm:"type:bool;defalut:false;" json:"is_recycled"`       // 是否回收
	IsPublished      bool     `gorm:"type:bool;defalut:false;" json:"is_published"`      // 是否发布
	IsAllowCommented bool     `gorm:"type:bool;defalut:true;" json:"is_allow_commented"` // 是否允许评论
	Pwd              string   `gorm:"type:varchar(100);" json:"pwd"`                     // 访问密码
	Title            string   `gorm:"type:varchar(255);not null" json:"title"`           // 标题
	Summary          string   `gorm:"type:varchar(255);not null" json:"summary"`         // 摘要
	Img              string   `gorm:"type:varchar(255);not null" json:"img"`             // 图片
	Content          string   `gorm:"type:MediumText;not null;" json:"content"`          // 内容
	MDContent        string   `gorm:"type:MediumText;not null;" json:"md_content"`       // markdown渲染后的内容
	CommentCount     string   `gorm:"type:int;defalut:0;" json:"comment_count"`          // 评论数
	VisitCount       string   `gorm:"type:int;defalut:0;" json:"visit_count"`            // 浏览数
}

// 新增文章
