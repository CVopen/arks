package controller

import (
	"arks_servers/forms"
	"arks_servers/utils"
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
)

type CategoryHandler struct{}

// @Summary 获取分类
// @Tags 授权
// @version 1.0
// @Accept application/json
// @data name string
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/register [post]
func (ch CategoryHandler) GetAllCategory(ctx *gin.Context) {
	id, _ := ctx.Get("id")

	result := utils.Result{
		Code: utils.Success,
		Msg:  "success",
		Data: nil,
	}

	pageForm := forms.CategoryPageForm{
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
	category := pageForm.BindToModel()

	list, total, err := category.GetAllList(&pageForm.Pagination)
	if err != nil {
		result.Msg = "error"
		result.Code = utils.RequestError
		result.Data = err
		ctx.JSON(http.StatusOK, result)
		return
	}

	dataList := make([]map[string]interface{}, len(list))
	for i, v := range list {
		dataList[i] = map[string]interface{}{
			"ID":        v.ID,
			"CreatedAt": v.CreatedAt,
			"name":      v.Name,
			"desc":      v.Desc,
			"del":       false,
			"edit":      false,
			"count":     v.Count,
		}

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

// @Summary 创建分类
// @Tags 授权
// @version 1.0
// @data name string desc string
// @Accept application/json
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/register [post]
func (ch CategoryHandler) CreateCategory(ctx *gin.Context) {
	id, _ := ctx.Get("id")
	createCategoryForm := forms.CreateCategoryForm{}
	result := utils.Result{
		Code: utils.Success,
		Msg:  "success",
		Data: nil,
	}
	if err := ctx.ShouldBindJSON(&createCategoryForm); err != nil {
		result.Msg = "参数错误"
		result.Data = err
		result.Code = utils.RequestError
		ctx.JSON(http.StatusOK, result)
		return
	}
	category := createCategoryForm.BindToModel()
	category.UserId = utils.TypeInterFaceToUint(id)

	cList, err := category.GetCategoryByName()
	if err != nil {
		result.Msg = "error"
		result.Code = utils.RequestError
		result.Data = err
		ctx.JSON(http.StatusOK, result)
		return
	}
	if len(cList) > 0 {
		result.Msg = "分类已存在"
		result.Code = utils.RequestError
		ctx.JSON(http.StatusOK, result)
		return
	}

	err = category.Create()
	if err != nil {
		result.Msg = "添加失败"
		result.Code = utils.RequestError
		result.Data = err
		ctx.JSON(http.StatusOK, result)
		return
	}

	ctx.JSON(http.StatusOK, result)
}

// @Summary 修改分类
// @Tags 授权
// @version 1.0
// @data id
// @Accept application/json
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/register [post]
func (ch CategoryHandler) EditCategory(ctx *gin.Context) {
	id, _ := ctx.Get("id")
	createCategoryForm := forms.CategoryInfoForm{}
	result := utils.Result{
		Code: utils.Success,
		Msg:  "success",
		Data: nil,
	}

	if err := ctx.ShouldBindJSON(&createCategoryForm); err != nil {
		result.Msg = "参数错误"
		result.Data = err
		result.Code = utils.RequestError
		ctx.JSON(http.StatusOK, result)
		return
	}

	category := createCategoryForm.BindToModel()
	category.UserId = utils.TypeInterFaceToUint(id)

	cList, err := category.GetCategoryByName()

	if err != nil {
		result.Msg = "error"
		result.Code = utils.RequestError
		result.Data = err
		ctx.JSON(http.StatusOK, result)
		return
	}
	if len(cList) > 0 && category.ID != cList[0].ID {
		result.Msg = "分类已存在"
		result.Code = utils.RequestError
		ctx.JSON(http.StatusOK, result)
		return
	}

	err = category.EditCategory()
	if err != nil {
		result.Msg = "修改失败"
		result.Code = utils.RequestError
		result.Data = err
		ctx.JSON(http.StatusOK, result)
		return
	}
	ctx.JSON(http.StatusOK, result)
}

// @Summary 删除分类
// @Tags 授权
// @version 1.0
// @Accept application/json
// @data id
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/register [post]
func (ch CategoryHandler) RemoveCategory(ctx *gin.Context) {
	b, err := ctx.GetRawData() // 从c.Request.Body读取请求数据
	result := utils.Result{
		Code: utils.Success,
		Msg:  "success",
		Data: nil,
	}
	if err != nil {
		result.Msg = "参数错误"
		result.Data = err
		result.Code = utils.RequestError
		ctx.JSON(http.StatusOK, result)
		return
	}

	var m map[string]interface{}
	// 反序列化
	_ = json.Unmarshal(b, &m)

	if utils.TypeChck(m["id"], "float64") {

		categoryIdForm := forms.CategoryIdForm{
			Id: utils.TypeFloat64ToUint(m["id"]),
		}
		category := categoryIdForm.BindToModel()
		err := category.RemoveCategory()
		if err != nil {
			result.Msg = "error"
			result.Data = err
			result.Code = utils.RequestError
			ctx.JSON(http.StatusOK, result)
			return
		}
	}
	if utils.TypeChck(m["id"], "[]interface {}") {
		list := utils.TypeInterFaceListToListUint(m["id"])
		categoryIdForm := forms.CategoryIdListForm{}
		category := categoryIdForm.BindToModel()
		err = category.RemoveBatchCategory(list)
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
