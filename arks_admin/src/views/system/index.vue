<template>
  <div class="container">
    <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="整站公告" prop="notice">
        <el-input v-model="formData.notice" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="首页背景图" prop="home_img">
        <el-input v-model="formData.home_img" placeholder="请输入首页背景图url" />
        <el-image
          style="width: 100px; height: 100px;"
          :src="imgList[0]"
          fit="contain"
          :preview-src-list="imgList">
        </el-image>
      </el-form-item>
      <el-form-item label="分类背景图" prop="category_img">
        <el-input v-model="formData.category_img" placeholder="请输入分类背景图url" />
        <el-image
          style="width: 100px; height: 100px;"
          :src="imgList[1]"
          fit="contain"
          :preview-src-list="imgList">
        </el-image>
      </el-form-item>
      <el-form-item label="标签背景图" prop="tag_img">
        <el-input v-model="formData.tag_img" placeholder="请输入标签背景图url" />
        <el-image
          style="width: 100px; height: 100px;"
          :src="imgList[2]"
          fit="contain"
          :preview-src-list="imgList">
        </el-image>
      </el-form-item>
      <el-form-item label="工具背景图" prop="tools_img">
        <el-input v-model="formData.tools_img" placeholder="请输入工具背景图url" />
        <el-image
          style="width: 100px; height: 100px;"
          :src="imgList[3]"
          fit="contain"
          :preview-src-list="imgList">
        </el-image>
      </el-form-item>
      <el-form-item label="友链背景图" prop="friends_img">
        <el-input v-model="formData.friends_img" placeholder="请输入友链背景图url" />
        <el-image
          style="width: 100px; height: 100px;"
          :src="imgList[4]"
          fit="contain"
          :preview-src-list="imgList">
        </el-image>
      </el-form-item>
      <el-form-item label="客户端背景图" prop="client_img">
        <el-input v-model="formData.client_img" placeholder="请输入客户端背景图url" />
        <el-image
          style="width: 100px; height: 100px;"
          :src="imgList[5]"
          fit="contain"
          :preview-src-list="imgList">
        </el-image>
      </el-form-item>
      <el-form-item>
        <el-button v-if="$store.state.user.userInfo.userId == 1" type="primary" @click="delConfig">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { 
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  nextTick,
  ref
} from 'vue'
import { editVisit } from "../../api/index"
import 'vditor/src/assets/scss/index.scss'
import { ElMessage } from 'element-plus'

import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const form = ref(null)
    const data = reactive({
      formData: {},
      imgList: [],
      rules: {
        notice: [
          { required: true, message: '请输入整站公告', trigger: 'change' }
        ],
        home_img: [
          { required: true, message: '请输入首页背景图url', trigger: 'change' }
        ],
        category_img: [
          { required: true, message: '请输入分类背景图url', trigger: 'change' }
        ],
        tag_img: [
          { required: true, message: '请输入标签背景图url', trigger: 'change' }
        ],
        tools_img: [
          { required: true, message: '请输入工具背景图url', trigger: 'change' }
        ],
        friends_img: [
          { required: true, message: '请输入友链背景图url', trigger: 'change' }
        ],
        client_img: [
          { required: true, message: '请输入客户端背景图url', trigger: 'change' }
        ]
      }
    })

    const initConfig = () => {
      nextTick(() => {
        data.formData = store.state.app.config
        data.imgList = [
          store.state.app.config.home_img,
          store.state.app.config.category_img,
          store.state.app.config.tag_img,
          store.state.app.config.tools_img,
          store.state.app.config.friends_img,
          store.state.app.config.client_img
        ]
      })
    }

    onMounted(initConfig)

    const delConfig = () => {
      form.value.validate((valid) => {
        if (valid) {
          editVisit(data.formData).then(() => {
            ElMessage.success({
              message: '修改成功',
              type: 'success'
            })
            store.commit('app/setConfig', data.formData)
            initConfig()
          })
        }
      });
    }

    return {
      ...toRefs(data),
      delConfig,
      form
    }
  },
})
</script>
<style scoped lang="scss">
::v-deep(.el-form-item__label) {
  color: #000
}
::v-deep(input) {
  background-color: rgba(255, 255, 255, .7) !important;
  width: 400px
}
::v-deep(.el-select__tags input) {
  background-color: transparent !important;
}
</style>