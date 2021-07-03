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
          >新增标签</el-button
        >
        <el-input
          v-model="params.name"
          placeholder="标签名"
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
              type="text"
              icon="el-icon-document"
              @click="handleEdit(scope)"
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
export default defineComponent({
  name: "tag",
  components: {
    EditTag,
    AddTag
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
      getTagList(data.params).then((res) => {
        console.log(res)
        res.data.data.forEach((item) => {
          item.CreatedAt = formatTime(item.CreatedAt)
        })
        data.tableData = res.data.data
        data.pageTotal = res.data.total
      })
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
      })
        .then(() => {
          delList(id)
        })
        .catch(() => {})
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
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
