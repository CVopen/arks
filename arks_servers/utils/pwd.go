package utils

import (
	"crypto/md5"
	"fmt"
)

// md5加密
func CryptoPwd(pwd string) string {

	data := []byte(pwd)
	has := md5.Sum(data)
	md5str1 := fmt.Sprintf("%x", has) //将[]byte转成16进制
	return md5str1
}

// 校验密码
func CheckPwd(pwd, dbPwd string) bool {
	pwd = CryptoPwd(pwd)
	return pwd == dbPwd
}
