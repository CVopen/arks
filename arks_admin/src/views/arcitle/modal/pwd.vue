<template>
  <!-- 编辑弹出框 -->
  <el-dialog title="密码验证" v-model="show" width="30%" @close="close">
    <el-form ref="form" :model="formData" label-width="70px">
      <el-form-item label="密码">
        <el-input v-model="formData.pwd"></el-input>
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
import { addCategory } from "../../../api/index"
import { ElMessage } from 'element-plus'
import { 
  defineComponent, 
  toRefs,
  reactive,
  watch
} from "vue"
export default defineComponent({
  name: "edit-catagory",
  props: {
    showModel: {
      require: true,
      type: Boolean,
      default: true
    },
    id: {
      require: true,
      type: Number,
      default: 0
    }
  },
  emits: ['close-modal', 'change'],
  setup(props, context) {
    const data = reactive({
      show: props.showModel,
      formData: { pwd: '' }
    })
    
    watch(props, (newVal) => {
        data.show = newVal.showModel
        data.formData = { pwd: '' }
      }
    )
    const close = () => {
      context.emit('close-modal')
    }
    const saveAdd = () => {
      addCategory(data.formData).then(() => {
        ElMessage({
          message: '添加成功',
          type: 'success'
        })
        close()
      })
    }
    return { 
      ...toRefs(data),
      saveAdd,
      close
    }
  }
})
</script>

<style scoped lang="scss"></style>
