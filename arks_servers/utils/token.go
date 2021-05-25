package utils

import (
	"errors"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
)

// MyClaims 自定义声明结构体并内嵌jwt.StandardClaims
// jwt包自带的jwt.StandardClaims只包含了官方字段
// 我们这里需要额外记录一个username字段，所以要自定义结构体
// 如果想要保存更多信息，都可以添加到这个结构体中
type MyClaims struct {
	Id uint `json:"id"`
	jwt.StandardClaims
}

// 常量
var (
	ErrTokenExpired     = errors.New("令牌已过期")
	ErrTokenNotValidYet = errors.New("令牌未激活")
	ErrTokenMalformed   = errors.New("令牌格式有误")
	ErrTokenInvalid     = errors.New("无效的令牌")
	MySecret            = []byte("夏天夏天悄悄过去") // 签名
)

const TokenExpireDuration = time.Hour * 15

// GenToken 生成JWT
func GenToken(id uint) (string, error) {
	// 创建一个我们自己的声明
	c := MyClaims{
		id, // 自定义字段
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(TokenExpireDuration).Unix(), // 过期时间
			Issuer:    "my-project",                               // 签发人
		},
	}
	// 使用指定的签名方法创建签名对象
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, c)
	// 使用指定的secret签名并获得完整的编码后的字符串token
	return token.SignedString(MySecret)
}

// ParseToken 解析JWT
func ParseToken(tokenString string) (*MyClaims, error) {
	// 解析token
	token, err := jwt.ParseWithClaims(
		strings.Split(tokenString, " ")[1],
		&MyClaims{},
		func(token *jwt.Token) (i interface{}, err error) {
			return MySecret, nil
		})

	if err != nil {
		if ve, ok := err.(*jwt.ValidationError); ok {
			if ve.Errors&jwt.ValidationErrorMalformed != 0 {
				return nil, ErrTokenMalformed
			} else if ve.Errors&jwt.ValidationErrorExpired != 0 {
				return nil, ErrTokenExpired
			} else if ve.Errors&jwt.ValidationErrorNotValidYet != 0 {
				return nil, ErrTokenNotValidYet
			} else {
				return nil, ErrTokenInvalid
			}
		}
	}
	if claims, ok := token.Claims.(*MyClaims); ok && token.Valid { // 校验token
		return claims, nil
	}
	return nil, errors.New("invalid token")
}

// 更新 token
func RefreshToken(id uint) (string, error) {
	token, err := GenToken(id)

	if err != nil {
		return "", errors.New("GenToken error")
	}

	return token, nil
}
