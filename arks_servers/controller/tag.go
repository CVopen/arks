package controller

import (
	"arks_servers/forms"
	"arks_servers/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type TagHandler struct{}

// @Summary 添加标签
// @Tags 授权
// @version 1.0
// @Accept application/json
// @data name string
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/v2/tag/add [post]
func (th TagHandler) CreateTag(ctx *gin.Context) {
	id, _ := ctx.Get("id")

	type bodyRequest struct {
		Id   float64 `json:"id" binding:"min=1,max=30" label:"类别id"`
		Name string  `json:"name" binding:"min=1,max=30" label:"标签名称"`
	}
	bodyR := bodyRequest{}

	result := utils.Result{
		Code: utils.Success,
		Msg:  "success",
		Data: nil,
	}

	if err := ctx.ShouldBindJSON(&bodyR); err != nil {
		result.Msg = "参数错误"
		result.Code = utils.RequestError
		ctx.JSON(http.StatusOK, result)
		return
	}

	createTagForm := forms.CreateTagForm{
		UserId: utils.TypeInterFaceToUint(id),
		Id:     utils.TypeFloat64ToUint(bodyR.Id),
		Name:   bodyR.Name,
	}

	tag := createTagForm.BindToModel()
	tagDetail, _ := tag.GetName()

	if tagDetail.Name != "" {
		result.Msg = "标签已存在"
		result.Code = utils.RequestError
		ctx.JSON(http.StatusOK, result)
		return
	}
	err := tag.Create()

	if err != nil {
		result.Msg = "添加失败"
		result.Code = utils.RequestError
		ctx.JSON(http.StatusOK, result)
		return
	}

	ctx.JSON(http.StatusOK, result)

}

// @Summary 标签列表
// @Tags 授权
// @version 1.0
// @Accept application/json
// @data name string
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/v2/tag/list [post]
func (th TagHandler) GetList(ctx *gin.Context) {
	id, _ := ctx.Get("id")

	result := utils.Result{
		Code: utils.Success,
		Msg:  "success",
		Data: nil,
	}

	form := forms.GetTagByUserForm{
		Id:   utils.TypeInterFaceToUint(id),
		Name: ctx.Query("name"),
	}

	tag := form.BindToModel()

	var (
		tagList interface{}
		err     error
	)

	if form.Name == "" {
		tagList, err = tag.GetAllList()
	} else {
		tagList, err = tag.GetAllNameList()
	}

	if err != nil {
		result.Code = utils.RequestError
		ctx.JSON(http.StatusOK, result)
	}

	result.Data = tagList
	ctx.JSON(http.StatusOK, result)
}

// @Summary 修改标签
// @Tags 授权
// @version 1.0
// @Accept application/json
// @data name string
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/v2/tag/edit [put]
func (th TagHandler) EditTag(ctx *gin.Context) {
	id, _ := ctx.Get("id")

	result := utils.Result{
		Code: utils.Success,
		Msg:  "success",
		Data: nil,
	}

	editForm := forms.EditTagForm{
		UserId: utils.TypeInterFaceToUint(id),
	}

	if err := ctx.ShouldBindJSON(&editForm); err != nil {
		result.Msg = "参数错误"
		result.Code = utils.RequestError
		ctx.JSON(http.StatusOK, result)
		return
	}

	tag := editForm.BindToModel()

	tagDetail, _ := tag.GetName()

	if tagDetail.Name != "" {
		result.Msg = "标签已存在"
		result.Code = utils.RequestError
		ctx.JSON(http.StatusOK, result)
		return
	}

	if err := tag.Edit(); err != nil {
		result.Msg = "error"
		result.Code = utils.RequestError
		ctx.JSON(http.StatusOK, result)
		return
	}

	ctx.JSON(http.StatusOK, result)
}

// @Summary 删除标签
// @Tags 授权
// @version 1.0
// @Accept application/json
// @data name string
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/v2/tag/del [put]
func (th TagHandler) Remove(ctx *gin.Context) {

}
