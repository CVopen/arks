package pwd

import (
	"arks_servers/utils"
	"crypto/md5"
	"fmt"
	"testing"
)

func TestPwd(t *testing.T) {
	got := utils.CryptoPwd("abc") // 程序输出的结果
	md := md5.Sum([]byte("abc"))
	want := fmt.Sprintf("%x", md) // 期望的结果
	if want != got {
		t.Errorf("excepted:%v, got:%v", want, got) // 测试失败输出错误提示
	}
}
