package utils

import "reflect"

//类型检测 要检测的变量  期望变量类型
func TypeChck(params interface{}, t string) bool {
	//数据初始化
	var (
		return_val bool = false
	)
	v := reflect.ValueOf(params)
	//获取传递参数类型
	v_t := v.Type()

	//类型名称对比
	if v_t.String() == t {
		return_val = true
	}
	return return_val
}

// 类型转换
func TypeFloat64ToUint(params interface{}) uint {
	return uint(params.(float64))
}

func TypeInterFaceToString(params interface{}) string {
	return params.(string)
}

func TypeInterFaceToUint(params interface{}) uint {
	return params.(uint)
}

func TypeInterFaceListToListUint(params interface{}) []uint {
	var list []interface{}
	switch v := params.(type) {
	case []interface{}:
		list = v
	}
	var listId []uint
	for _, value := range list {
		listId = append(listId, TypeFloat64ToUint(value))
	}
	return listId
}
