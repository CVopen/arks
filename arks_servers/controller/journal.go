package controller

import (
	"arks_servers/forms"
	"arks_servers/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Journal struct{}

// @Summary 获取日志列表
// @Tags 授权
// @version 1.0
// @Accept application/json
// @data name string
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/register [post]
func (Journal) GetJournalList(ctx *gin.Context) {
	id, _ := ctx.Get("id")
	result := utils.Result{
		Code: utils.Success,
		Msg:  "success",
		Data: nil,
	}

	form := forms.JournalForm{}
	if id != nil {
		form.UserId = utils.TypeInterFaceToUint(id)
	}

	if err := ctx.ShouldBindQuery(&form); err != nil {
		result.Code = utils.RequestError
		result.Msg = "error"
		ctx.JSON(http.StatusOK, result)
		return
	}

	list, total, err := form.BindToModel().GetJournalList(&form.Pagination)

	dataList := make([]map[string]interface{}, len(list))
	for i, v := range list {
		dataList[i] = map[string]interface{}{
			"ID":        v.ID,
			"CreatedAt": v.CreatedAt,
			"content":   v.Content,
			"userName":  v.User.Nickname,
		}
	}

	if err != nil {
		result.Code = utils.RequestError
		result.Msg = "查询失败"
		ctx.JSON(http.StatusOK, result)
		return
	}

	result.Data = utils.PageData(dataList, total, form.Pagination)
	ctx.JSON(http.StatusOK, result)
}
