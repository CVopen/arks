<template>
  <div class="container">
    <div class="handle-box">
      <el-button
        type="primary"
        icon="el-icon-plus"
        class="handle-del mr10"
        @click="() => showAdd = true"
        >新增标签</el-button
      >
      <el-input
        v-model="params.name"
        placeholder="标签名"
        class="handle-input mr10"
      />
      <el-button type="primary" icon="el-icon-search" @click="params.id=0;getList(1)"
        >搜索</el-button
      >
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      class="table"
      ref="multipleTable"
      header-cell-class-name="table-header"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        :selectable="isSelect"
        width="55"
        align="center"
      />
      <el-table-column
        prop="ID"
        label="ID"
        width="55"
        align="center"
      />
      <el-table-column prop="name" label="标签名称" />
      <el-table-column prop="count" label="文章总数" align="center" />
      <el-table-column prop="CreatedAt" label="创建时间" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            v-if="scope.row.edit"
            type="text"
            icon="el-icon-edit"
            @click="handleEdit(scope)"
            >编辑</el-button
          >
          <el-button
            v-if="scope.row.del"
            type="text"
            icon="el-icon-delete"
            class="red"
            @click="handleDelete(scope.row.ID)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :current-page="params.page"
        :page-size="params.pageSize"
        :total="pageTotal"
        hide-on-single-page
        @current-change="handlePageChange"
      ></el-pagination>
    </div>
    <EditTag 
      @change="getList" 
      :showModel="showEdit"
      :form="form"
      @close-modal="handleEdit"
    />
    <AddTag 
      @change="getList(1)" 
      :showModel="showAdd"
      :form="form"
      @close-modal="() => showAdd = false"
    />
  </div>
</template>

<script>
import { getTagList, delTag } from "../../api/index"
import { formatTime } from "../../utils/index"
import EditTag from "./modal/editTag.vue"
import AddTag from "./modal/addTag.vue"
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  defineComponent, 
  toRefs,
  reactive,
  onMounted
} from "vue"
import { useRoute } from 'vue-router'
export default defineComponent({
  name: "tag-list",
  components: {
    EditTag,
    AddTag
  },
  setup() {
    const router = useRoute()
    const data = reactive({
      params: {
        name: "",
        page: 1,
        pageSize: 10
      },
      pageTotal: 0,
      tableData: [],
      showEdit: false,
      showAdd: false,
      form: {},
      loading: false
    })
    const getList = (page) => {
      data.loading = true
      if (page) {
        data.params.page = 1
      }
      getTagList(data.params).then((res) => {
        res.data.data.forEach((item) => {
          item.CreatedAt = formatTime(item.CreatedAt)
        })
        data.tableData = res.data.data
        data.pageTotal = res.data.total
        data.loading = false
      }).catch(() => data.loading = false)
    }

    const delList = (id) => {
      delTag({ id }).then(() => {
        ElMessage.success({
          message: '删除成功',
          type: 'success'
        })
        getList(1)
      })
    }
    // 删除操作
    const handleDelete = (id) => {
      // 二次确认删除
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning"
      }).then(() => delList(id)).catch(() => {})
    }

    // 编辑操作
    const handleEdit = (scoped) => {
      if (!scoped) return data.showEdit = false
      data.form = scoped.row
      data.showEdit = true
    }

    // 分页导航
    const handlePageChange = (val) => {
      data.params.page = val
      getList()
    }
    
    const isSelect = (row) => row.del

    onMounted(() => {
      if (router.query.id) {
        data.params.id = router.query.id
      }
      getList(1)
    })

    return { 
      ...toRefs(data),
      getList,
      handleDelete,
      handleEdit,
      handlePageChange,
      isSelect
    }
  }
})
</script>

<style scoped lang="scss">
@import "../../assets/css/element.scss";
</style>
