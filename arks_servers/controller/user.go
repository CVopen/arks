package controller

import (
	"acks_servers/models"
	"acks_servers/utils"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

type UserHandler struct{}

// @Title 新增模版
// @Author mengyilingjian@outlook.com
// @Description 新增模版
// @Tags release template
// @Param Authorization	header	string true "Bearer 31a165baebe6dec616b1f8f3207b4273"
// @Param body body	ReleaseTemplateAdd true "JSON数据"
// @Success 200 {object} handler.ReportJSONResult
// @Router	/api/v1/release/template/add [post]
func (u *UserHandler) CreateUser(ctx *gin.Context) {
	// 从请求中把数据拿出来
	var user models.User
	var err error
	if err = ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err = user.Create(); err != nil {
		ctx.JSON(http.StatusOK, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, user)
}

func (u *UserHandler) LoginUser(ctx *gin.Context) {
	var id uint = 1
	token, _ := utils.GenToken(id)
	ctx.JSON(http.StatusOK, token)
}

func (u *UserHandler) LoginUser2(ctx *gin.Context) {
	authHeader := ctx.Request.Header.Get("Authorization")
	tokens := strings.Split(authHeader, " ")

	token, _ := utils.ParseToken(tokens[1])
	ctx.JSON(http.StatusOK, token.Id)
}
