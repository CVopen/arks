package models

import (
	"acks_servers/config/db"
	"acks_servers/utils"
	"fmt"

	"gorm.io/gorm"
)

// 用户
type User struct {
	gorm.Model
	Username  string `gorm:"type:varchar(30);not null;" json:"username"`     // 用户名
	Email     string `gorm:"type:varchar(30);not null;unique;" json:"email"` // 邮箱
	Password  string `gorm:"type:varchar(60);not null;" json:"password"`     // 密码
	Nickname  string `gorm:"type:varchar(30);not null;" json:"nickname"`     // 昵称
	UserImg   string `gorm:"type:varchar(255);default:'http://zhizi-public.oss-cn-hangzhou.aliyuncs.com/20210511/f472a827fcfb5bf808ec12d08026ce24.png';" json:"user_img"`
	Signature string `gorm:"type:varchar(255);" json:"signature"` // 签名
}

// 创建用户
func (u User) Create() error {
	fmt.Println(u.UserImg)
	fmt.Println(u.Username)
	u.Password = utils.CryptoPwd(u.Password)
	fmt.Println(u.Password)
	// return nil
	return db.Db.Create(&u).Error
}
