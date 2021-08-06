package utils

import (
	"bytes"
	"crypto/cipher"
	"crypto/des"
	"encoding/hex"
	"fmt"

	"github.com/mojocn/base64Captcha"
)

// 验证码结构体
type CaptchaConfig struct {
	Id            string                       `json:"id"`
	CaptchaType   string                       `json:"captcha_type"`
	VerifyValue   string                       `json:"verify_value"`
	DriverAudio   *base64Captcha.DriverAudio   `json:"driver_audio"`
	DriverString  *base64Captcha.DriverString  `json:"driver_string"`
	DriverChinese *base64Captcha.DriverChinese `json:"driver_chinese"`
	DriverMath    *base64Captcha.DriverMath    `json:"driver_math"`
	DriverDigit   *base64Captcha.DriverDigit   `json:"driver_digit"`
}

var key = "openopen"

var store = base64Captcha.DefaultMemStore

// 生成验证码
func GenerateCaptcha(captcha *CaptchaConfig) (string, error) {
	var driver base64Captcha.Driver

	// 根据验证码类型生成 base64 验证码
	switch captcha.CaptchaType {
	case "audio":
		driver = captcha.DriverAudio
	case "string":
		driver = captcha.DriverString.ConvertFonts()
	case "math":
		driver = captcha.DriverMath.ConvertFonts()
	case "chinese":
		driver = captcha.DriverChinese.ConvertFonts()
	default:
		captcha.DriverDigit = base64Captcha.NewDriverDigit(50, 120, 4, 0.6, 50)
		driver = captcha.DriverDigit
	}
	//初始化driver
	//captcha.DriverDigit = base64Captcha.NewDriverDigit(38, 120, 4, 0.7, 80)
	/*	captcha.DriverDigit = base64Captcha.NewDriverDigit(80, 240, 4, 0.7, 80)
		driver = captcha.DriverDigit*/
	c := base64Captcha.NewCaptcha(driver, store)
	id, b64s, err := c.Generate()
	captcha.Id = id

	if err != nil {
		return "", err
	}

	return b64s, nil
}

// 校验验证码
func CaptchaVerify(captcha *CaptchaConfig) bool {
	return store.Verify(captcha.Id, captcha.VerifyValue, false)
}

//CBC加密
func EncryptDES_CBC(src string) string {
	fmt.Println("EncryptDES_CBC", src)
	data := []byte(src)
	keyByte := []byte(key)
	block, err := des.NewCipher(keyByte)
	if err != nil {
		panic(err)
	}
	data = PKCS5Padding(data, block.BlockSize())
	//获取CBC加密模式
	iv := keyByte //用密钥作为向量(不建议这样使用)
	mode := cipher.NewCBCEncrypter(block, iv)
	out := make([]byte, len(data))
	mode.CryptBlocks(out, data)
	return fmt.Sprintf("%X", out)
}

//CBC解密
func DecryptDES_CBC(src string) string {
	keyByte := []byte(key)
	data, err := hex.DecodeString(src)
	if err != nil {
		fmt.Println(err.Error())
		panic(err)
	}
	block, err := des.NewCipher(keyByte)
	if err != nil {
		panic(err)
	}
	iv := keyByte //用密钥作为向量(不建议这样使用)
	mode := cipher.NewCBCDecrypter(block, iv)
	plaintext := make([]byte, len(data))
	mode.CryptBlocks(plaintext, data)
	plaintext = PKCS5UnPadding(plaintext)
	return string(plaintext)
}

//明文补码算法
func PKCS5Padding(ciphertext []byte, blockSize int) []byte {
	padding := blockSize - len(ciphertext)%blockSize
	padtext := bytes.Repeat([]byte{byte(padding)}, padding)
	return append(ciphertext, padtext...)
}

//明文减码算法
func PKCS5UnPadding(origData []byte) []byte {
	length := len(origData)
	unpadding := int(origData[length-1])
	return origData[:(length - unpadding)]
}
