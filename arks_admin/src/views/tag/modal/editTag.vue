<template>
  <!-- 编辑弹出框 -->
  <el-dialog title="编辑" v-model="show" width="30%" @close="close">
    <el-form ref="form" :model="formData" label-width="70px">
      <el-form-item label="标签名">
        <el-input v-model="formData.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { editTag } from "../../../api/index"
import { 
  defineComponent, 
  toRefs,
  reactive,
  watch
} from "vue"
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: "edit-catagory",
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
        name: props.form.name
      }
    })
    
    watch(props, (newVal) => {
        data.show = newVal.showModel
        data.formData = {
          id: newVal.form.ID,
          name: newVal.form.name
        }
      }
    )
    const close = () => {
      context.emit('close-modal')
    }
    const saveEdit = () => {
      editTag(data.formData).then(() => {
        ElMessage.success({
          message: '修改成功',
          type: 'success'
        })
        context.emit('change')
        close()
      })
    }
    return { 
      ...toRefs(data),
      saveEdit, 
      close
    }
  }
})
</script>

<style scoped lang="scss"></style>
