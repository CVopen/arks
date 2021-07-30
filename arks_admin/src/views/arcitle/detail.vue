<template>
  <div class="container">
    <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="所属分类" prop="category_id">
        <el-select v-model="formData.category_id" filterable placeholder="请选择分类" @change="changeCategory">
          <el-option v-for="item in categoryList" :key="item.ID" :label="item.name" :value="item.ID"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属标签" prop="tag_list">
        <el-select v-model="formData.tagList" filterable multiple placeholder="请选择标签">
          <el-option v-for="item in tagList" :key="item.ID" :label="item.name" :value="item.ID"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="评论">
        <el-radio v-model="formData.is_allow_commented" :label="true">是</el-radio>
        <el-radio v-model="formData.is_allow_commented" :label="false">否</el-radio>
      </el-form-item>
      <el-form-item label="置顶" v-if="$store.state.user.userInfo.userId == 1">
        <el-radio v-model="formData.is_top" :label="true">是</el-radio>
        <el-radio v-model="formData.is_top" :label="false">否</el-radio>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.pwd" type="password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="摘要" prop="summary">
        <el-input v-model="formData.summary" placeholder="请输入摘要" />
      </el-form-item>
      <el-form-item label="封面图">
        <el-input v-model="formData.img" placeholder="请输入图片url" />
      </el-form-item>
      <el-form-item label="内容">
        <div id="addEditor"></div>
      </el-form-item>
      <el-form-item>
        <template v-if="see">
          <el-button type="primary" @click="createArcitle">提交</el-button>
          <el-button @click="reset">重置</el-button>
        </template>
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
  ref
} from 'vue'
import { getCategoryList, getTagList, addArcitle, getArticleDetail } from "../../api/index"
import Vditor from 'vditor'
import 'vditor/src/assets/scss/index.scss'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const data = reactive({
      formData: {
        tagList: [],
        is_allow_commented: true,
        is_top: false
      },
      categoryList: [],
      tagList: [],
      contentEditor: null,
      rules: {
        category_id: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        tagList: [
          { required: true, message: '请选择标签', trigger: 'change' }
        ],
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        summary: [
          { required: true, message: '请输入文章摘要', trigger: 'blur' }
        ]
      },
      see: true
    })
    const form = ref(null)
    const initEditor = () => {
      data.contentEditor = new Vditor('addEditor', {
        height: 380,
        cache: {
          enable: false
        },
        counter: 100000,
        hint: {
          emoji: {
            pray: '🙏',
            broken_heart: '💔',
            ok_hand: '👌',
            smile: '😄',
            laughing: '😆',
            smirk: '😏',
            heart_eyes: '😍',
            grin: '😁',
            stuck_out_tongue: '😛',
            expressionless: '😑',
            unamused: '😒',
            sob: '😭',
            joy: '😂',
            tired_face: '😫',
            blush: '😊',
            cry: '😢',
            fearful: '😨',
            care: '🤷‍♀️'
          }
        },
        upload: {
          accept: '.jpg,.png,.gif,.jpeg',
          max: 2 * 1024 * 1024,
          url: '_this.uploadUrl',
          headers: '_this.headers',
          // filename: name => {
          //   name
          //     .replace(/[^(a-zA-Z0-9\u4e00-\u9fa5.)]/g, '')
          //     .replace(/[?\\/:|<>*[\]()$%{}@~]/g, '')
          //     .replace('/\\s/g', '')
          // },
          filename: (name) => console.log(name),
          // success (editor, data) {
          //   data = JSON.parse(data)
          // },
          // error (data) {
          //   console.log(data)
          //   alert('上传失败')
          // }
        },
        after: () => {
          if (route.query.see) data.see = false
          if (route.query.id) {
            getArticleDetail({ id: route.query.id }).then(res => {
              data.formData = res.data
              data.contentEditor.setValue(res.data.content)
              getTag(res.data.category_id)
            })
          }
        }
      })
    }
    const changeCategory = (id) => {
      data.formData.tagList = []
      getTag(id)
    }

    const getTag = id => {
      getTagList({pageSize: 1000, id}).then(res => {
        data.tagList = res.data.data
      })
    }

    onMounted(() => {
      getCategoryList({pageSize: 1000}).then(res => {
        data.categoryList = res.data.data
      })
      initEditor()
    })

    const createArcitle = () => {
      form.value.validate((valid) => {
        if (valid) {
          data.formData.content = data.contentEditor.getValue()
          data.formData.md_content = data.contentEditor.getHTML()
          addArcitle(data.formData).then(() => {
            ElMessage.success({
              message: '操作成功',
              type: 'success'
            })
            router.push('/arcitle/list')
          })
        }
      });
    }
    const reset = () => {
      data.formData = {
        tagList: [],
        is_allow_commented: true,
        is_top: false
      }
      data.tagList = []
    }

    return {
      ...toRefs(data),
      createArcitle,
      form,
      changeCategory,
      reset
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