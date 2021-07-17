package cron

import (
	"arks_servers/models"
	"fmt"
	"log"
	"strings"

	"github.com/robfig/cron"
)

// 创建定时任务
func CreateCorn() {

	fmt.Println(strings.Repeat("START ", 15))
	models.InitStatistics()
	CronTest()
	fmt.Println(strings.Repeat("END ", 15))

}

func CronTask() {
	log.Println("********  *******  *******")
}

func CronTest() {

	c := cron.New()
	c.AddFunc("@daily", CronTask) //2 * * * * *, 2 表示每分钟的第2s执行一次
	c.Start()

	defer c.Stop()
	select {}
}
