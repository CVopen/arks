package controller

import (
	"arks_servers/forms"
	"arks_servers/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type VisitHandler struct{}

// @Summary 更新访问
// @Tags 授权
// @version 1.0
// @data name string desc string
// @Accept application/json
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/register [post]
func (vi VisitHandler) UpdateVisit(ctx *gin.Context) {

}

// @Summary 获取整站数据
// @Tags 授权
// @version 1.0
// @data name string desc string
// @Accept application/json
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/register [post]
func (vi VisitHandler) GetVisit(ctx *gin.Context) {
	visitForm := forms.VisitForm{}
	result := utils.Result{
		Code: utils.Success,
		Msg:  "success",
		Data: nil,
	}

	data, err := visitForm.BindToModel().GetStatistics()

	if err != nil {
		result.Code = utils.RequestError
		result.Msg = "error"
		ctx.JSON(http.StatusOK, result)
		return
	}

	result.Data = data

	ctx.JSON(http.StatusOK, result)
}
