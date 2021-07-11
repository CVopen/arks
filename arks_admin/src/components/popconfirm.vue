<template>
  <el-popconfirm
    confirmButtonText='确定'
    cancelButtonText='不用了'
    :icon="iconPop"
    :iconColor="iconColor"
    :title="title"
  >
    <template #reference>
      <el-button :style="{color: color}" :icon="buttonIcon" :type="buttonType">{{ text }}</el-button>
    </template>
  </el-popconfirm>
</template>
<script>
import { defineComponent } from "vue"
export default defineComponent({
  props: {
    title: {
      type: String,
      default: '确定要删除吗?'
    },
    iconPop: {
      type: String,
      default: 'el-icon-info'
    },
    buttonType: {
      type: String,
      default: 'text'
    },
    text: {
      type: String,
      default: '删除'
    },
    buttonIcon: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: 'red'
    },
    color: {
      type: String
    }
  }
})
</script>
<style scoped lang="scss">
::v-deep(.el-popper) {
  background-color: #fff !important;
}
</style>