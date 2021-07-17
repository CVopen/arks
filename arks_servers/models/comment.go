package models

import (
	"gorm.io/gorm"
)

// 评论
type Comment struct {
	gorm.Model
	User            User      `gorm:"ForeignKey:UserId;not null;" json:"user"`          // 用户
	UserId          uint      `json:"user_id"`                                          // 用户id
	Article         Article   `gorm:"ForeignKey:ArticleId" json:"article"`              // 文章
	ArticleId       uint      `json:"article_id"`                                       // 文章 ID
	RootCommentId   uint      `json:"root_comment_id"`                                  // 根评论 ID
	ParentCommentId uint      `json:"parent_comment_id"`                                // 父评论 ID
	RootComment     *Comment  `gorm:"ForeignKey:RootCommentId" json:"root_comment"`     // 根评论
	ParentComment   *Comment  `gorm:"ForeignKey:ParentCommentId" json:"parent_comment"` // 父评论
	ChildComments   []Comment `gorm:"-" json:"child_comments"`
	UserImg         string    `gorm:"type:Text;not null;" json:"user_img"`         // 用户头像
	NickName        string    `gorm:"type:varchar(50);not null;" json:"nick_name"` // 昵称
	Content         string    `gorm:"type:Text;not null;" json:"content"`          // 评论内容
	MDContent       string    `gorm:"type:MediumText;not null;" json:"md_content"` // markdown 渲染后评论内容
	Device          string    `gorm:"type:varchar(100);not null;" json:"device"`   // 设备
	IsRecycled      bool      `gorm:"type:bool;default:false;" json:"is_recycled"` // 是否加入回收站
	IsChecked       bool      `gorm:"type:bool;default:false" json:"is_checked"`   // 是否通过审核
}
