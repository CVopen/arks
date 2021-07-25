package controller

import (
	"arks_servers/forms"
	"arks_servers/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type LinkHandler struct{}

// @Summary 新增链接
// @Tags 授权
// @version 1.0
// @Accept application/json
// @data name string
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/register [post]
func (LinkHandler) CreatedLink(ctx *gin.Context) {
	id, _ := ctx.Get("id")
	result := utils.Result{
		Code: utils.Success,
		Msg:  "success",
		Data: nil,
	}

	form := forms.LinkForm{
		UserId: utils.TypeInterFaceToUint(id),
	}

	if err := ctx.ShouldBindJSON(&form); err != nil {
		result.Msg = "参数错误"
		result.Data = err
		result.Code = utils.RequestError
		ctx.JSON(http.StatusOK, result)
	}
	linkData, err := form.BindToModel().FindLink()
	if err != nil && err.Error() != "record not found" {
		result.Msg = "error"
		result.Code = utils.RequestError
		result.Data = err.Error()
		ctx.JSON(http.StatusOK, result)
	}
	if linkData.Name != "" {
		result.Msg = "链接已存在"
		result.Code = utils.RequestError
		ctx.JSON(http.StatusOK, result)
		return
	}

	if err := form.BindToModel().Create(); err != nil {
		result.Msg = "error"
		result.Code = utils.RequestError
		result.Data = err.Error()
		ctx.JSON(http.StatusOK, result)
		return
	}

	ctx.JSON(http.StatusOK, result)
}

// @Summary 更新链接
// @Tags 授权
// @version 1.0
// @Accept application/json
// @data name string
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/register [post]
func (LinkHandler) EditLink(ctx *gin.Context) {
	result := utils.Result{
		Code: utils.Success,
		Msg:  "success",
		Data: nil,
	}
	id, _ := ctx.Get("id")
	form := forms.LinkForm{
		UserId: utils.TypeInterFaceToUint(id),
	}

	if err := ctx.ShouldBindJSON(&form); err != nil {
		result.Msg = "参数错误"
		result.Data = err
		result.Code = utils.RequestError
		ctx.JSON(http.StatusOK, result)
	}

	if err := form.BindToModel().UpdateLink(); err != nil {
		result.Msg = "error"
		result.Code = utils.RequestError
		result.Data = err.Error()
		ctx.JSON(http.StatusOK, result)
		return
	}

	ctx.JSON(http.StatusOK, result)
}

// @Summary 删除链接
// @Tags 授权
// @version 1.0
// @Accept application/json
// @data name string
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/register [post]
func (LinkHandler) DelLink(ctx *gin.Context) {
	result := utils.Result{
		Code: utils.Success,
		Msg:  "success",
		Data: nil,
	}
	id, _ := ctx.Get("id")
	form := forms.LinkDelForm{
		UserId: utils.TypeInterFaceToUint(id),
	}

	if err := ctx.ShouldBindJSON(&form); err != nil {
		result.Msg = "参数错误"
		result.Data = err
		result.Code = utils.RequestError
		ctx.JSON(http.StatusOK, result)
	}

	if len(form.Ids) > 0 {
		if err := form.BindToModel().DelLinkList(form.Ids); err != nil {
			result.Msg = "error"
			result.Code = utils.RequestError
			result.Data = err.Error()
			ctx.JSON(http.StatusOK, result)
			return
		}
	} else {
		if err := form.BindToModel().DelLink(); err != nil {
			result.Msg = "error"
			result.Code = utils.RequestError
			result.Data = err.Error()
			ctx.JSON(http.StatusOK, result)
			return
		}
	}

	ctx.JSON(http.StatusOK, result)
}

// @Summary 获取链接
// @Tags 授权
// @version 1.0
// @Accept application/json
// @data name string
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/register [post]
func (LinkHandler) GetLink(ctx *gin.Context) {
	id, _ := ctx.Get("id")
	result := utils.Result{
		Code: utils.Success,
		Msg:  "success",
		Data: nil,
	}

	pageForm := forms.LinkGetList{
		UserId: 0,
	}
	if id != nil {
		pageForm.UserId = utils.TypeInterFaceToUint(id)
	}

	if err := ctx.ShouldBindQuery(&pageForm); err != nil {
		result.Code = utils.RequestError
		result.Msg = "error"
		ctx.JSON(http.StatusOK, result)
		return
	}

	var typeLink uint
	if reqType, _ := ctx.Get("type"); reqType == "tools" {
		typeLink = 2
	} else {
		typeLink = 1
	}
	list, total, err := pageForm.BindToModel().GetLinks(&pageForm.Pagination, pageForm.State, typeLink)

	if err != nil {
		result.Code = utils.RequestError
		result.Msg = "查询失败"
		ctx.JSON(http.StatusOK, result)
		return
	}

	dataList := make([]map[string]interface{}, len(list))
	for i, v := range list {
		dataList[i] = map[string]interface{}{
			"ID":           v.ID,
			"CreatedAt":    v.CreatedAt,
			"name":         v.Name,
			"url":          v.Url,
			"desc":         v.Desc,
			"icon":         v.Icon,
			"is_recycled":  v.IsRecycled,
			"is_published": v.IsPublished,
			"change":       false,
		}

		if utils.TypeInterFaceToUint(id) == 1 || utils.TypeInterFaceToUint(id) == v.UserId {
			dataList[i]["change"] = true
		}
	}

	result.Data = utils.PageData(dataList, total, pageForm.Pagination)

	ctx.JSON(http.StatusOK, result)
}

// @Summary 获取全部链接
// @Tags 授权
// @version 1.0
// @Accept application/json
// @data name string
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/register [post]
func (LinkHandler) GetLinkAll(ctx *gin.Context) {
	result := utils.Result{
		Code: utils.Success,
		Msg:  "success",
		Data: nil,
	}

	pageForm := forms.LinkGetList{}

	if err := ctx.ShouldBindQuery(&pageForm); err != nil {
		result.Code = utils.RequestError
		result.Msg = "error"
		ctx.JSON(http.StatusOK, result)
		return
	}

	var typeLink uint
	if reqType, _ := ctx.Get("type"); reqType == "tools" {
		typeLink = 2
	} else {
		typeLink = 1
	}
	list, _, err := pageForm.BindToModel().GetLinks(&pageForm.Pagination, pageForm.State, typeLink)

	if err != nil {
		result.Code = utils.RequestError
		result.Msg = "查询失败"
		ctx.JSON(http.StatusOK, result)
		return
	}

	dataList := make([]map[string]interface{}, len(list))
	for i, v := range list {
		dataList[i] = map[string]interface{}{
			"name": v.Name,
			"url":  v.Url,
			"desc": v.Desc,
			"icon": v.Icon,
		}
	}

	result.Data = dataList

	ctx.JSON(http.StatusOK, result)
}
