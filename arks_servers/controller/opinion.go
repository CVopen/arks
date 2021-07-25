package controller

import (
	"arks_servers/forms"
	"arks_servers/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type OpinionController struct{}

// @Summary 获取待办列表
// @Tags 授权
// @version 1.0
// @Accept application/json
// @data name string
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/register [post]
func (OpinionController) GetOpinionList(ctx *gin.Context) {
	id, _ := ctx.Get("id")

	result := utils.Result{
		Code: utils.Success,
		Msg:  "success",
		Data: nil,
	}

	opinion := forms.OpinionGetForm{}
	if id != nil {
		opinion.UserId = utils.TypeInterFaceToUint(id)
	}

	list, err := opinion.BindToModel().GetOpinionList()
	if err != nil {
		result.Code = utils.RequestError
		result.Msg = "查询失败"
		ctx.JSON(http.StatusOK, result)
		return
	}

	dataList := make([]map[string]interface{}, len(list))
	for i, v := range list {
		dataList[i] = map[string]interface{}{
			"ID":        v.ID,
			"CreatedAt": v.CreatedAt,
			"user_name": v.User.Nickname,
			"images":    v.Images,
			"state":     v.State,
			"content":   v.Content,
			"message":   v.Message,
		}
	}

	result.Data = dataList
	ctx.JSON(http.StatusOK, result)
}

// @Summary 修改状态
// @Tags 授权
// @version 1.0
// @Accept application/json
// @data name string
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/register [put]
func (OpinionController) PutState(ctx *gin.Context) {
	result := utils.Result{
		Code: utils.Success,
		Msg:  "success",
		Data: nil,
	}

	form := forms.OpinionEditAndDelForm{}

	err := ctx.ShouldBindJSON(&form)

	if err != nil {
		result.Code = utils.RequestError
		result.Msg = "参数错误"
		ctx.JSON(http.StatusOK, result)
		return
	}

	err = form.BindToModel().EditState()

	if err != nil {
		result.Code = utils.RequestError
		result.Msg = "更改失败"
		ctx.JSON(http.StatusOK, result)
		return
	}

	ctx.JSON(http.StatusOK, result)
}
