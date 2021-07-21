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
          @click="() => handleEdit(false)"
          >新增分类</el-button
        >
        <el-input
          v-model="params.name"
          :placeholder="$route.path.indexOf('tools') > 0 ? '工具名称' : '友链名称'"
          class="handle-input mr10"
        />
        <el-select v-model="params.state" class="handle-input mr10" placeholder="请选择状态">
          <el-option label="请选择" value="0" />
          <el-option label="已发布" value="1" />
          <el-option label="未发布" value="2" />
          <el-option label="回收站" value="3" />
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="getList(1)"
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
        ></el-table-column>
        <el-table-column
          prop="ID"
          label="ID"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="desc" label="介绍" />
        <el-table-column label="图标" width="160" align="center">
          <template #default="scope">
            <el-image fit="contain" style="height: 60px" :src="scope.row.icon" :preview-src-list="[scope.row.icon]" />
          </template>
        </el-table-column>
        <el-table-column label="链接">
          <template #default="scope">
            <a href="https://github.com/CVopen" target="view_window" style="color: #4a90e2">
              {{ scope.row.url }}sdfsdf
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="CreatedAt" label="创建时间" />
        <el-table-column label="状态" align="center">
          <template #default="scope">
            <span v-if="scope.row.is_recycled == 1">回收站</span>
            <span v-else-if="scope.row.is_published == 1">已发布</span>
            <span v-else>未发布</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              v-if="scope.row.change"
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              v-if="scope.row.change"
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.row.ID)"
              >删除</el-button
            >
            <span v-if="!scope.row.change">无</span>
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
    </div>
    <AddLinks 
      @change="getList(1)" 
      :showModel="showAdd"
      :form="form"
      @close-modal="() => showAdd = false"
    />
  </div>
</template>

<script>
import { delLink, getFriendsList, getToolsList } from "../../api/index"
import { formatTime } from "../../utils/index"
import AddLinks from "./modal/addLink.vue"
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  defineComponent,
  toRefs,
  reactive,
  onMounted
} from "vue"
import { useRoute } from 'vue-router'
export default defineComponent({
  name: "links",
  components: { AddLinks },
  setup() {
    const data = reactive({
      params: {
        name: "",
        state: '',
        page: 1,
        pageSize: 10
      },
      pageTotal: 0,
      tableData: [],
      multipleSelection: [],
      showAdd: false,
      form: {},
      loading: false
    })

    const route = useRoute()

    const getMethod = () => {
      if (route.path.indexOf('tools') > 1) return getToolsList
      return getFriendsList
    }

    const getList = (page) => {
      data.loading = true
      if (page) data.params.page = 1
      getMethod()(data.params).then(res => {
        res.data.data.forEach(item => {
          item.CreatedAt = formatTime(item.CreatedAt)
        })
        data.tableData = res.data.data
        data.pageTotal = res.data.total
        data.loading = false
      }).catch(() => data.loading = false)
    }

    const delList = (id) => {
      const params = {}
      if (typeof id === 'number') {
        params.id = id
      } else {
        params.ids = id
      }
      delLink(params).then(() => {
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
      if (!scoped) {
        data.showAdd = true
        data.form = {}
        return
      }
      data.form = scoped
      data.showAdd = true
    }
    const delAllSelection = () => {
      handleDelete(data.multipleSelection.map(item => item.ID))
    }
    // 分页导航
    const handlePageChange = (val) => {
      data.params.page = val
      getList()
    }

    const isSelect = (row) => row.change

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
