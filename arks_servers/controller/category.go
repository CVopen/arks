package controller

import (
	"arks_servers/forms"
	"arks_servers/models"
	"arks_servers/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type CategoryHandler struct{}

// @Summary 获取分类
// @Tags 授权
// @version 1.0
// @Accept application/json
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/register [post]
func (ch CategoryHandler) GetAllCategory(ctx *gin.Context) {
	id, _ := ctx.Get("id")
	getCategoryForm := forms.GetCategoryForm{
		Id: id.(uint),
	}
	result := utils.Result{
		Code: utils.Success,
		Msg:  "",
		Data: nil,
	}
	category := getCategoryForm.BindToModel()
	list, err := category.GetAllList()
	if err != nil {
		result.Msg = ""
		result.Code = utils.RequestError
		result.Data = err
		ctx.JSON(http.StatusOK, result)
		return
	}

	result.Data = list
	ctx.JSON(http.StatusOK, result)
}

// @Summary 创建分类
// @Tags 授权
// @version 1.0
// @Accept application/json
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/register [post]
func (ch CategoryHandler) CreateCategory(ctx *gin.Context) {
	id, _ := ctx.Get("id")
	createCategoryForm := forms.CreateCategoryForm{}
	result := utils.Result{
		Code: utils.Success,
		Msg:  "",
		Data: nil,
	}
	if err := ctx.ShouldBindJSON(&createCategoryForm); err != nil {
		result.Msg = "参数错误"
		result.Code = utils.RequestError
		ctx.JSON(http.StatusBadRequest, result)
		return
	}
	category := createCategoryForm.BindToModel()

	user := models.User{}
	user, err := user.FindUser(id.(uint))
	if err != nil {
		result.Msg = "查找用户失败"
		result.Code = utils.RequestError
		result.Data = err
		ctx.JSON(http.StatusOK, result)
		return
	}
	category.User = user
	category.UserId = id.(uint)
	err = category.Create()
	if err != nil {
		result.Msg = "添加失败"
		result.Code = utils.RequestError
		result.Data = err
		ctx.JSON(http.StatusOK, result)
		return
	}
	result.Msg = "添加分类成功"
	ctx.JSON(http.StatusOK, result)
}
