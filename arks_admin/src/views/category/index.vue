<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
          >批量删除</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-plus"
          class="handle-del mr10"
          @click="() => showAdd = true"
          >新增分类</el-button
        >
        <el-input
          v-model="params.name"
          placeholder="分类名"
          class="handle-input mr10"
        />
        <el-button type="primary" icon="el-icon-search" @click="getList(1)"
          >搜索</el-button
        >
      </div>
      <el-table
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
        ></el-table-column>
        <el-table-column
          prop="ID"
          label="ID"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>
        <el-table-column prop="desc" label="介绍"> </el-table-column>
        <el-table-column prop="count" label="文章总数" align="center">
        </el-table-column>
        <el-table-column prop="CreatedAt" label="创建时间"></el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              type="text"
              icon="el-icon-document"
              @click="$router.push({path: '/category/tag', query: {id: scope.row.ID}})"
              >查看</el-button
            >
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
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
    <Edit 
      @change="getList" 
      :showModel="showEdit"
      :form="form"
      @close-modal="handleEdit"
    />
    <AddCategory 
      @change="getList(1)" 
      :showModel="showAdd"
      :form="form"
      @close-modal="() => showAdd = false"
    />
  </div>
</template>

<script>
import { getCategoryList, delCategory } from "../../api/index"
import { formatTime } from "../../utils/index"
import Edit from "./modal/editCategory.vue"
import AddCategory from "./modal/addCategory.vue"
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  defineComponent, 
  toRefs,
  reactive,
  onMounted
} from "vue"
export default defineComponent({
  name: "category-list",
  components: {
    Edit,
    AddCategory
  },
  setup() {
    const data = reactive({
      params: {
        name: "",
        page: 1,
        pageSize: 10
      },
      pageTotal: 0,
      tableData: [],
      multipleSelection: [],
      showEdit: false,
      showAdd: false,
      form: {},
    })
    const getList = (page) => {
      if (page) {
        data.params.page = 1
      }
      getCategoryList(data.params).then((res) => {
        console.log(res)
        res.data.data.forEach((item) => {
          item.CreatedAt = formatTime(item.CreatedAt)
        })
        data.tableData = res.data.data
        data.pageTotal = res.data.total
      })
    }

    const delList = (id) => {
      delCategory({ id }).then(() => {
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
    // 多选操作
    const handleSelectionChange = (val) => {
      data.multipleSelection = val
    }
    // 编辑操作
    const handleEdit = (scoped) => {
      if (!scoped) return data.showEdit = false
      data.form = scoped.row
      data.showEdit = true
    }
    const delAllSelection = () => {
      handleDelete(data.multipleSelection.map(item => item.ID))
    }
    // 分页导航
    const handlePageChange = (val) => {
      data.params.page = val
      getList()
    }

    const isSelect = (row) => row.del

    onMounted(() => {
      getList(1)
    })

    return { 
      ...toRefs(data),
      getList,
      handleDelete,
      handleSelectionChange,
      handleEdit,
      delAllSelection,
      handlePageChange,
      isSelect
    }
  }
})
</script>

<style scoped lang="scss">
@import "../../assets/css/element.scss";
</style>
