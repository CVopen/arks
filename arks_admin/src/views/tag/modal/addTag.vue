<template>
  <!-- 编辑弹出框 -->
  <el-dialog title="编辑" v-model="show" width="30%" @close="close">
    <el-form ref="form" :model="formData" label-width="70px">
      <el-form-item label="所属分类">
        <el-select v-model="formData.id" filterable placeholder="请选择分类">
          <el-option v-for="item in list" :key="item.ID" :label="item.name" :value="item.ID" />
        </el-select>
      </el-form-item>
      <el-form-item label="标签名">
        <el-input v-model="formData.name" />
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
import { addTag, getCategoryList } from "../../../api/index"
import { ElMessage } from 'element-plus'
import { 
  defineComponent, 
  toRefs,
  reactive,
  watch,
  onMounted
} from "vue"
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
        name: '',
        id: ''
      },
      list: []
    })
    onMounted(() => {
      getCategoryList({pageSize: 1000}).then(res => {
        data.list = res.data.data
      })
    })
    watch(props, (newVal) => {
        data.show = newVal.showModel
        data.formData = {
          name: '',
          id: ''
        }
      }
    )
    const close = () => {
      context.emit('close-modal')
    }
    const saveAdd = () => {
      addTag(data.formData).then(() => {
        ElMessage({
          message: '添加成功',
          type: 'success'
        })
        context.emit('change')
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

<style lang="scss">
.el-select {
  width: 100%;
}
</style>
