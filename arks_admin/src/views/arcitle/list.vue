<template>
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
        @click="$router.push('/arcitle/add')"
        >添加文章</el-button
      >
      <el-input
        v-model="params.title"
        placeholder="文章名称"
        class="handle-input mr10"
      />
      <el-button type="primary" icon="el-icon-search" @click="getList(1)">搜 索</el-button>
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
      <el-table-column width="180" prop="title" label="文章标题" />
      <el-table-column prop="summary" label="简介" />
      <el-table-column
        prop="img"
        label="封面图"
        width="140"
      >
        <template #default="scope">
          <el-image
            fit="contain"
            style="height: 60px"
            :src="scope.row.img"
            :preview-src-list="[scope.row.img]" 
          />
        </template>
      </el-table-column>
      <el-table-column width="120" prop="category_name" label="分类名称" align="center" />
      <el-table-column width="80" prop="comment_count" label="评论数" align="center" />
      <el-table-column width="80" prop="visit_count" label="浏览数" align="center" />
      <el-table-column width="180" prop="CreatedAt" label="创建时间" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            type="text"
            icon="el-icon-document"
            @click="$router.push({path: '/tag', query: {id: scope.row.ID}})"
            >查看</el-button
          >
          <el-button
            v-if="scope.row.edit"
            type="text"
            icon="el-icon-edit"
            @click="handleEdit(scope)"
            >编辑</el-button
          >
          <Pop
            :text="scope.row.is_recycled ? '恢复' : '回收'"
            :title="'确定要' + (scope.row.is_recycled ? '恢复' : '回收') + '吗？'"
            buttonIcon="el-icon-takeaway-box"
            @confirm="recycled(scope.row.is_recycled ? false : true, scope.row.ID)"
          />
          <template v-if="!scope.row.is_recycled">
            <Pop
              :text="scope.row.is_published ? '下架' : '发布'"
              :title="'确定要' + (scope.row.is_published ? '下架' : '发布') + '吗？'"
              :buttonIcon="scope.row.is_published ? 'el-icon-close-notification' : 'el-icon-bell'"
              @confirm="recycled(scope.row.is_recycled ? false : true, scope.row.ID)"
            />
            <Pop
              v-if="scope.row.is_published"
              :title="'确定要' + (scope.row.is_top ? '取消置顶' : '置顶文章') + '吗？'"
              :text="scope.row.is_top ? '取消置顶' : '置顶文章'"
              :buttonIcon="scope.row.is_top ? 'el-icon-bottom' : 'el-icon-top'"
              @confirm="top(scope.row.is_top ? false : true, scope.row.ID)"
            />
            <Pop
              v-if="scope.row.is_published"
              :title="'确定要' + (scope.row.is_allow_commented ? '取消评论' : '允许评论') + '吗？'"
              :text="scope.row.is_allow_commented ? '取消评论' : '允许评论'"
              buttonIcon="el-icon-s-comment"
              @confirm="comment(scope.row.is_allow_commented ? false : true, scope.row.ID)"
            />
          </template>
          <Pop
            v-if="scope.row.del"
            color="red"
            buttonIcon="el-icon-delete"
            @confirm="del(scope.row.ID)"
          />
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
import { 
  getArcitleList, 
  editPublish,
  editTop,
  editCommented,
  editRecovery,
  delArticle
} from "../../api/index"
import { formatTime } from "../../utils/index"
import Edit from "./modal/editCategory.vue"
import AddCategory from "./modal/addCategory.vue"
import PopConfirm from "../../components/popconfirm.vue"
import { 
  defineComponent, 
  toRefs,
  reactive,
  onMounted
} from "vue"
export default defineComponent({
  name: "arcitle-list",
  components: {
    Edit,
    AddCategory,
    Pop: PopConfirm
  },
  setup() {
    const data = reactive({
      params: {
        title: "",
        page: 1,
        pageSize: 10,
        state: 0,
        tagList: [1],
        category_id: ''
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
      getArcitleList(data.params).then((res) => {
        res.data.data.forEach((item) => {
          item.CreatedAt = formatTime(item.CreatedAt)
        })
        data.tableData = res.data.data
        data.pageTotal = res.data.total
      })
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
    }

    // 分页导航
    const handlePageChange = (val) => {
      data.params.page = val
      getList()
    }

    const isSelect = (row) => row.del

    // 发布文章
    const publish = (state, id) => {
      editPublish({ state, id }).then(() => {
        getList()
      })
    }

    // 是否回收
    const recycled = (state, id) => {
      editRecovery({ state, id }).then(() => getList())
    }

    // 置顶文章
    const top = (state, id) => {
      editTop({ state, id }).then(() => getList())
    }

    // 是否评论文章
    const comment = (state, id) => {
      editCommented({ state, id }).then(() => getList())
    }

    // 删除文章
    const del = id => {
      delArticle({ id }).then(() => getList())
    }

    onMounted(() => getList())

    return { 
      ...toRefs(data),
      getList,
      handleSelectionChange,
      handleEdit,
      delAllSelection,
      handlePageChange,
      isSelect,
      publish,
      recycled,
      top,
      comment,
      del
    }
  }
})
</script>

<style scoped lang="scss">
@import "../../assets/css/element.scss";
</style>
