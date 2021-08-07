<template>
  <!-- 编辑弹出框 -->
  <el-dialog title="新增" v-model="show" width="30%" @close="close">
    <el-form ref="formLink" :model="formData" :rules="rules" label-width="70px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="链接" prop="url">
        <el-input v-model="formData.url" />
      </el-form-item>
      <el-form-item label="icon" prop="icon">
        <el-input v-model="formData.icon" />
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input type="textarea" show-word-limit maxlength="200" v-model="formData.desc" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="saveAdd">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { addLinkList, editLinkList } from '../../../api/index'
import { ElMessage } from 'element-plus'
import { 
  defineComponent, 
  toRefs,
  reactive,
  watch,
  ref
} from "vue"
import { useRoute } from 'vue-router'
export default defineComponent({
  name: "add-links",
  props: {
    showModel: {
      require: true,
      type: Boolean,
      default: true
    },
    form: {
      require: true,
      type: Object,
      default() {
        return {}
      }
    }
  },
  emits: ['close-modal', 'change'],
  setup(props, context) {
    const data = reactive({
      show: props.showModel,
      formData: {
        name: '',
        desc: '',
        url: '',
        icon: ''
      },
      rules: {
        name: [
          { required: true, message: '请选择名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请选择链接', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请输入icon链接', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入描述内容', trigger: 'blur' }
        ]
      }
    })
    const formLink = ref(null)
    
    watch(props, (newVal) => {
        data.show = newVal.showModel
        data.formData = {
          name: newVal.form.name,
          desc: newVal.form.desc,
          url: newVal.form.url,
          icon: newVal.form.icon,
          id: newVal.form.ID
        }
      }
    )
    const close = () => {
      context.emit('close-modal')
    }

    const getMethod = () => {
      if (data.formData.id) return editLinkList
      return addLinkList
    }

    const route = useRoute()

    const saveAdd = () => {
      formLink.value.validate(valid => {
        if (!valid) return
        getMethod()({...data.formData, type: route.path.indexOf('tools') > 0 ? 2 : 1}).then(() => {
          ElMessage({
            message: '操作成功',
            type: 'success'
          })
          context.emit('change')
          close()
        })
      })
    }

    return { 
      ...toRefs(data),
      saveAdd,
      close,
      formLink
    }
  }
})
</script>

<style scoped lang="scss"></style>
