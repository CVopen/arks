package cron

import (
	"arks_servers/models"
	"fmt"
	"strings"

	"github.com/robfig/cron"
)

// 创建定时任务
func CreateCorn() {

	fmt.Println(strings.Repeat("START ", 15))
	models.InitStatistics()
	cronTest()
	fmt.Println(strings.Repeat("END ", 15))

}

func cronTask() {
	if err := models.UpdateDayData(); err != nil {
		fmt.Println("UpdateDayData error")
	}

}

func cronTest() {

	c := cron.New()
	c.AddFunc("@daily", cronTask) //2 * * * * *, 2 表示每分钟的第2s执行一次
	c.Start()

	defer c.Stop()
	select {}
}
