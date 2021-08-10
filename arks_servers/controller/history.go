package controller

import (
	"arks_servers/forms"
	"arks_servers/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type HistoryHandler struct{}

// @Summary 获取历史记录列表
// @Tags 授权
// @version 1.0
// @Accept application/json
// @data name string
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/register [post]
func (HistoryHandler) GetListBlog(ctx *gin.Context) {
	id, _ := ctx.Get("id")
	result := utils.Result{
		Code: utils.Success,
		Msg:  "success",
		Data: nil,
	}

	history := forms.GetHistoryForm{
		UserId: utils.TypeInterFaceToUint(id),
	}
	if err := ctx.ShouldBindQuery(&history); err != nil {
		result.Code = utils.RequestError
		result.Msg = "error"
		ctx.JSON(http.StatusOK, result)
		return
	}

	data, total, err := history.BindToModel().GetHistory(&history.Pagination)
	if err != nil {
		result.Msg = "error"
		result.Data = err
		result.Code = utils.RequestError
		ctx.JSON(http.StatusOK, result)
		return
	}

	historyData := make(map[string][]map[string]interface{}, 3)
	for k, v := range data {
		historyData[k] = make([]map[string]interface{}, len(data[k]))
		for i, history := range v {
			historyData[k][i] = map[string]interface{}{
				"ID":        history.ID,
				"CreatedAt": history.CreatedAt,
				"UpdatedAt": history.UpdatedAt,
				"title":     history.Article.Title,
				"img":       history.Article.Img,
				"a_id":      history.ArticleId,
				"c_id":      history.Article.Category.ID,
				"c_name":    history.Article.Category.Name,
				"u_name":    history.Article.User.Nickname,
				"u_img":     history.Article.User.UserImg,
			}
		}
	}

	result.Data = utils.PageData(historyData, total, history.Pagination)
	ctx.JSON(http.StatusOK, result)
}

// @Summary 删除历史记录
// @Tags 授权
// @version 1.0
// @Accept application/json
// @data name string
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/v2/tag/del [put]
func (HistoryHandler) Remove(ctx *gin.Context) {
	result := utils.Result{
		Code: utils.Success,
		Msg:  "success",
		Data: nil,
	}
	form := forms.DelHistoryForm{}
	if err := ctx.ShouldBindJSON(&form); err != nil {
		result.Msg = "参数错误"
		result.Data = err
		result.Code = utils.RequestError
		ctx.JSON(http.StatusOK, result)
		return
	}

	if err := form.BindToModel().Delete(); err != nil {
		result.Msg = "error"
		result.Data = err
		result.Code = utils.RequestError
		ctx.JSON(http.StatusOK, result)
		return
	}

	ctx.JSON(http.StatusOK, result)
}
