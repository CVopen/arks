package controller

import (
	"arks_servers/forms"
	"arks_servers/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ArticleHandler struct{}

// @Summary 新增文章
// @Tags 授权
// @version 1.0
// @Accept application/json
// @data name string
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/register [post]
func (ArticleHandler) CreatedArticle(ctx *gin.Context) {
	id, _ := ctx.Get("id")

	result := utils.Result{
		Code: utils.Success,
		Msg:  "success",
		Data: nil,
	}

	articleForm := forms.CreateArticleForm{
		UserId: utils.TypeInterFaceToUint(id),
	}

	if err := ctx.ShouldBindJSON(&articleForm); err != nil {
		result.Msg = "参数错误"
		result.Data = err
		result.Code = utils.RequestError
		ctx.JSON(http.StatusOK, result)
	}

	acricle := articleForm.BindToModel()
	err := acricle.Create(articleForm.TagList)
	if err != nil {
		result.Msg = "error"
		if err.Error() == "文章名已经存在" {
			result.Msg = err.Error()
		}
		result.Code = utils.RequestError
		result.Data = err
		ctx.JSON(http.StatusOK, result)
		return
	}

	ctx.JSON(http.StatusOK, result)
}

// @Summary 获取文章列表
// @Tags 授权
// @version 1.0
// @Accept application/json
// @data name string
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/register [post]
func (ArticleHandler) GetArticle(ctx *gin.Context) {
	id, _ := ctx.Get("id")
	result := utils.Result{
		Code: utils.Success,
		Msg:  "success",
		Data: nil,
	}

	pageForm := forms.GetArticlePageForm{}

	if err := ctx.ShouldBindQuery(&pageForm); err != nil {
		result.Code = utils.RequestError
		result.Msg = "error"
		ctx.JSON(http.StatusOK, result)
		return
	}

	article := pageForm.BindToModel()

	list, total, err := article.GetList(&pageForm.Pagination, pageForm.State, pageForm.TagList)

	if err != nil {
		result.Code = utils.RequestError
		result.Msg = "查询失败"
		ctx.JSON(http.StatusOK, result)
		return
	}

	dataList := make([]map[string]interface{}, len(list))
	for i, v := range list {
		dataList[i] = map[string]interface{}{
			"ID":                 v.ID,
			"CreatedAt":          v.CreatedAt,
			"title":              v.Title,
			"visit_count":        v.VisitCount,
			"comment_count":      v.CommentCount,
			"img":                v.Img,
			"summary":            v.Summary,
			"category_name":      v.Category.Name,
			"is_allow_commented": v.IsAllowCommented,
			"is_published":       v.IsPublished,
			"is_recycled":        v.IsRecycled,
			"del":                false,
			"edit":               false,
			"captcha":            false,
			"is_top":             v.IsTop,
		}
		if v.UserId == utils.TypeInterFaceToUint(id) {
			dataList[i]["del"] = true
			dataList[i]["edit"] = true
		}
		if utils.TypeInterFaceToUint(id) == 1 {
			dataList[i]["del"] = true
		}
		if v.Pwd != "" {
			dataList[i]["pwd"] = true
		}
	}

	result.Data = utils.PageData(dataList, total, pageForm.Pagination)

	ctx.JSON(http.StatusOK, result)
}

// @Summary 修改文章状态文章
// @Tags 授权
// @version 1.0
// @Accept application/json
// @data name string
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/register [put]
func (ArticleHandler) PutArticle(ctx *gin.Context) {
	reqType, _ := ctx.Get("type")

	result := utils.Result{
		Code: utils.Success,
		Msg:  "success",
		Data: nil,
	}

	form := forms.PuTArticleForm{}

	err := ctx.ShouldBindJSON(&form)

	if err != nil {
		result.Code = utils.RequestError
		result.Msg = "参数错误"
		ctx.JSON(http.StatusOK, result)
		return
	}

	switch reqType {
	case utils.PublishedArticle:
		err = form.BindToModelPublish().PublishedArticle()
	case utils.TopArticle:
		err = form.BindToModelTop().TopArticle()
	case utils.CommentedArticle:
		err = form.BindToModelComment().AllowCommented()
	case utils.RecycledArticle:
		err = form.BindToModelRecycled().RecycledArticle()
	}

	if err != nil {
		result.Code = utils.RequestError
		result.Msg = "更改失败"
		ctx.JSON(http.StatusOK, result)
		return
	}

	ctx.JSON(http.StatusOK, result)
}

// @Summary 删除文章
// @Tags 授权
// @version 1.0
// @Accept application/json
// @data name string
// @Success 100 object utils.Result 成功
// @Failure 103/104 object utils.Result 失败
// @Router /admin/register [put]
func (ArticleHandler) DelArticleHandler(ctx *gin.Context) {

	result := utils.Result{
		Code: utils.Success,
		Msg:  "success",
		Data: nil,
	}

	form := forms.PuTArticleForm{}

	err := ctx.ShouldBindJSON(&form)

	if err != nil {
		result.Code = utils.RequestError
		result.Msg = "参数错误"
		ctx.JSON(http.StatusOK, result)
		return
	}

	if err = form.BindToModelDel().DelArticle(); err != nil {
		result.Code = utils.RequestError
		result.Msg = "删除失败"
		ctx.JSON(http.StatusOK, result)
		return
	}

	ctx.JSON(http.StatusOK, result)
}
