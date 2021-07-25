<template>
  <div class="container">
    <div class="handle-box">
      <el-date-picker
        v-model="params.time"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
      <el-button type="primary" icon="el-icon-search" @click="handlePageChange(1)">搜索</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      class="table"
      header-cell-class-name="table-header"
    >
      <el-table-column prop="ID" label="ID" width="55" align="center"/>
      <el-table-column prop="CreatedAt" width="200" label="创建时间" align="center" />
      <el-table-column prop="userName" width="150" label="用户名" align="center" />
      <el-table-column prop="content" label="内容" />
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
</template>

<script>
import { getJournalList } from "../../api/index"
import { formatTime } from "../../utils/index"
import { 
  defineComponent, 
  toRefs,
  reactive,
  onMounted
} from "vue"
export default defineComponent({
  name: "journal-list",
  setup() {
    const data = reactive({
      params: {
        page: 1,
        pageSize: 10,
        time: [Date.now() - 84000 * 1000 * 7, new Date()],
        start_time: '',
        end_time: ''
      },
      tableData: [],
      pageTotal: 0,
      loading: false
    })
    const getList = page => {
      data.loading = true
      if (page) {
        data.params.page = 1
      }
      data.params.start_time = formatTime(data.params.time[0])
      data.params.end_time = formatTime(data.params.time[1])
      getJournalList(data.params).then((res) => {
        res.data.data.forEach(item => {
          item.CreatedAt = formatTime(item.CreatedAt)
        })
        data.tableData = res.data.data
        data.pageTotal = res.data.total
        data.loading = false
      }).catch(() => data.loading = false)
    }

    // 分页导航
    const handlePageChange = (val) => {
      data.params.page = val
      getList()
    }

    onMounted(() => getList(1))

    return { 
      ...toRefs(data),
      getList,
      handlePageChange
    }
  }
})
</script>

<style scoped lang="scss">
@import "../../assets/css/element.scss";
::v-deep(.el-date-editor) {
  width: 500px;
  margin-right: 10px;
  input {
    background-color: transparent !important;
  }
}
</style>
