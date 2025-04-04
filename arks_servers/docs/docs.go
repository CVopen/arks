// GENERATED BY THE COMMAND ABOVE; DO NOT EDIT
// This file was generated by swaggo/swag

package docs

import (
	"bytes"
	"encoding/json"
	"strings"

	"github.com/alecthomas/template"
	"github.com/swaggo/swag"
)

var doc = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{.Description}}",
        "title": "{{.Title}}",
        "contact": {},
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/blog/captcha": {
            "get": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "授权"
                ],
                "summary": "创建验证码",
                "responses": {
                    "100": {
                        "description": "code\":10000,\"data\":base64,\"msg\":\"验证码创建成功\"}",
                        "schema": {
                            "$ref": "#/definitions/utils.Result"
                        }
                    },
                    "104": {
                        "description": "code\":10001,\"data\":base64,\"msg\":\"服务器端错误\"}",
                        "schema": {
                            "$ref": "#/definitions/utils.Result"
                        }
                    }
                }
            }
        },
        "/blog/login": {
            "post": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "授权"
                ],
                "summary": "登录",
                "responses": {
                    "100": {
                        "description": "Continue",
                        "schema": {
                            "$ref": "#/definitions/utils.Result"
                        }
                    },
                    "104": {
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/utils.Result"
                        }
                    }
                }
            }
        },
        "/blog/register": {
            "post": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "授权"
                ],
                "summary": "注册",
                "responses": {
                    "100": {
                        "description": "Continue",
                        "schema": {
                            "$ref": "#/definitions/utils.Result"
                        }
                    },
                    "104": {
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/utils.Result"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "utils.Result": {
            "type": "object",
            "properties": {
                "code": {
                    "description": "状态码",
                    "type": "integer"
                },
                "data": {
                    "description": "数据",
                    "type": "object"
                },
                "msg": {
                    "description": "提示",
                    "type": "string"
                }
            }
        }
    }
}`

type swaggerInfo struct {
	Version     string
	Host        string
	BasePath    string
	Schemes     []string
	Title       string
	Description string
}

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = swaggerInfo{
	Version:     "1.0",
	Host:        "localhost:8888",
	BasePath:    "",
	Schemes:     []string{},
	Title:       "web接口bolg",
	Description: "Acks 博客项目 API 接口文档",
}

type s struct{}

func (s *s) ReadDoc() string {
	sInfo := SwaggerInfo
	sInfo.Description = strings.Replace(sInfo.Description, "\n", "\\n", -1)

	t, err := template.New("swagger_info").Funcs(template.FuncMap{
		"marshal": func(v interface{}) string {
			a, _ := json.Marshal(v)
			return string(a)
		},
	}).Parse(doc)
	if err != nil {
		return doc
	}

	var tpl bytes.Buffer
	if err := t.Execute(&tpl, sInfo); err != nil {
		return doc
	}

	return tpl.String()
}

func init() {
	swag.Register(swag.Name, &s{})
}
