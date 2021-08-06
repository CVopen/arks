<template>
  <!-- 编辑弹出框 -->
  <el-dialog title="完成" v-model="show" width="30%" @close="close">
    <el-form ref="formLink" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="处理意见" prop="message">
        <el-input v-model="formData.message" type="textarea"  maxlength="150" show-word-limit />
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
import { ElMessage } from 'element-plus'
import { 
  defineComponent, 
  toRefs,
  reactive,
  watch,
  ref
} from "vue"
import { putOpinion } from '@/api'
export default defineComponent({
  props: {
    showModel: {
      require: true,
      type: Boolean,
      default: true
    },
    id: {
      type: Number,
      default: 0
    }
  },
  emits: {
    'close-modal': null,
    'change': null
  },
  setup(props, context) {
    const data = reactive({
      show: props.showModel,
      formData: {
        message: '',
        id: props.id,
        state: 3
      },
      rules: {
        message: [
          { required: true, message: '请输入处理意见', trigger: 'blur' }
        ]
      }
    })
    const formLink = ref(null)
    
    watch(props, (newVal) => {
        data.show = newVal.showModel
        data.formData.message = ''
        data.formData.id = newVal.id
      }
    )
    const close = () => {
      context.emit('close-modal')
    }

    const saveAdd = () => {
      formLink.value.validate(valid => {
        if (!valid) return
        putOpinion(data.formData).then(() => {
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
