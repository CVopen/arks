package controller

import (
	"arks_servers/forms"
	"arks_servers/utils"
	"encoding/json"
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
		Id   float64 `json:"id" label:"类别id"`
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
	tagDetail, err := tag.GetAllNameList()
	if len(tagDetail) > 0 {
		result.Msg = "标签已存在"
		result.Code = utils.RequestError
		ctx.JSON(http.StatusOK, result)
		return
	}

	if err != nil {
		result.Msg = "添加失败"
		result.Code = utils.RequestError
		ctx.JSON(http.StatusOK, result)
		return
	}

	err = tag.Create()

	if err != nil {
		result.Msg = "添加失败"
		result.Data = err
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

	pageForm := forms.TagPageForm{
		UserId: utils.TypeInterFaceToUint(id),
	}

	if err := ctx.ShouldBindQuery(&pageForm); err != nil {
		ctx.JSON(http.StatusOK, utils.Result{
			Code: utils.RequestError,
			Msg:  "error",
			Data: nil,
		})
		return
	}

	tag := pageForm.BindToModel()

	list, total, err := tag.GetAllList(&pageForm.Pagination)

	if err != nil {
		result.Code = utils.RequestError
		result.Data = err
		ctx.JSON(http.StatusOK, result)
	}

	dataList := make([]map[string]interface{}, len(list))
	for i, v := range list {
		dataList[i] = make(map[string]interface{}, 6)
		dataList[i]["ID"] = v.ID
		dataList[i]["CreatedAt"] = v.CreatedAt
		dataList[i]["name"] = v.Name
		dataList[i]["del"] = false
		dataList[i]["edit"] = false
		dataList[i]["count"] = v.Count
		if v.UserId == pageForm.UserId {
			dataList[i]["del"] = true
			dataList[i]["edit"] = true
		}
		if pageForm.UserId == 1 {
			dataList[i]["del"] = true
			dataList[i]["edit"] = true
		}
	}

	result.Data = utils.PageData(dataList, total, pageForm.Pagination)
	ctx.JSON(http.StatusOK, result)
}

// @Summary 获取全部标签列表
// @Tags 授权
// @version 1.0
// @Accept application/json
// @data name string
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/v2/tag/list [post]
func (th TagHandler) GetListAll(ctx *gin.Context) {

	result := utils.Result{
		Code: utils.Success,
		Msg:  "success",
		Data: nil,
	}

	pageForm := forms.TagPageForm{}

	if err := ctx.ShouldBindQuery(&pageForm); err != nil {
		ctx.JSON(http.StatusOK, utils.Result{
			Code: utils.RequestError,
			Msg:  "error",
			Data: nil,
		})
		return
	}

	tag := pageForm.BindToModel()

	list, _, err := tag.GetAllList(&pageForm.Pagination)

	if err != nil {
		result.Code = utils.RequestError
		result.Data = err
		ctx.JSON(http.StatusOK, result)
	}

	dataList := make([]map[string]interface{}, len(list))
	for i, v := range list {
		dataList[i] = make(map[string]interface{}, 6)
		dataList[i]["ID"] = v.ID
		dataList[i]["CreatedAt"] = v.CreatedAt
		dataList[i]["name"] = v.Name
	}

	result.Data = dataList
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

	if tagDetail.Name != "" && tag.ID != tagDetail.ID {
		result.Msg = "标签已存在"
		result.Code = utils.RequestError
		ctx.JSON(http.StatusOK, result)
		return
	}

	if err := tag.Edit(); err != nil {
		result.Msg = "error"
		result.Data = err
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
	b, err := ctx.GetRawData() // 从c.Request.Body读取请求数据
	result := utils.Result{
		Code: utils.Success,
		Msg:  "success",
		Data: nil,
	}
	if err != nil {
		result.Msg = "参数错误"
		result.Code = utils.RequestError
		ctx.JSON(http.StatusOK, result)
		return
	}

	var m map[string]interface{}
	// 反序列化
	_ = json.Unmarshal(b, &m)

	if utils.TypeChck(m["id"], "float64") {
		delTagByIdForm := forms.DelTagByIdForm{
			Id: utils.TypeFloat64ToUint(m["id"]),
		}
		tag := delTagByIdForm.BindToModel()
		err := tag.DelTagOne()
		if err != nil {
			result.Msg = "error"
			result.Data = err
			result.Code = utils.RequestError
			ctx.JSON(http.StatusOK, result)
			return
		}
	}

	ctx.JSON(http.StatusOK, result)

}
