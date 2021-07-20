<template>
  <!-- 编辑弹出框 -->
  <el-dialog title="编辑" v-model="show" width="30%" @close="close">
    <el-form ref="form" :model="formData" label-width="70px">
      <el-form-item label="分类名">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="formData.desc"></el-input>
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
import { editCategory } from "../../../api/index"
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
  emits: {
    'close-modal': null,
    'change': null
  },
  setup(props, context) {
    const data = reactive({
      show: props.showModel,
      formData: {
        name: props.form.name,
        desc: props.form.desc
      }
    })
    
    watch(props, (newVal) => {
        data.show = newVal.showModel
        data.formData = {
          id: newVal.form.ID,
          name: newVal.form.name,
          desc: newVal.form.desc
        }
      }
    )
    const close = () => {
      context.emit('close-modal')
    }
    const saveEdit = () => {
      editCategory(data.formData).then(() => {
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
