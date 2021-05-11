package setting

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"

	"gopkg.in/yaml.v2"
)

var Config = &Setting{}

// 总配置
type Setting struct {
	Server   server   `yaml:"server"`
	Database database `yaml:"db"`
}

// 服务配置
type server struct {
	Mode    string `yaml:"mode"`
	Port    string `yaml:"port"`
	Keysign string `yaml:"keysign"`
}

// 数据库配置
type database struct {
	Host        string `yaml:"host"`
	UserName    string `yaml:"user_name"`
	Password    string `yaml:"password"`
	Database    string `yaml:"database"`
	Port        string `yaml:"port"`
	TimeZone    string `yaml:"time_zone"`
	MaxIdleConn int    `yaml:"max_idle_conn"`
	MaxOpenConn int    `yaml:"max_open_conn"`
}

// 读取 yaml 配置文件
func (s *Setting) InitSetting() {
	// 获取当前项目根目录
	rootPath, _ := os.Getwd()
	fmt.Println(rootPath)
	yamlPath := filepath.Join(rootPath, "config", "develop.yaml")
	log.Println("配置文件路径：", yamlPath)
	yamlFile, err := ioutil.ReadFile(yamlPath)
	if err != nil {
		log.Panicln("Read config yaml filed", err.Error())
	}

	err = yaml.Unmarshal([]byte(yamlFile), &Config)
	if err != nil {
		log.Panicln("读取配置文件失败：", err.Error())
	}

	// 转换配置文件参数
	err = yaml.Unmarshal(yamlFile, Config)
	if err != nil {
		log.Panicln("配置参数转换失败：", err.Error())
	}
	fmt.Println(Config)
}
