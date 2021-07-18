<template>
  <div class="container">
    <div class="handle-box">
      <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
      <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="$router.push('/arcitle/add')">添加文章</el-button>
      <el-select v-model="params.category_id" class="handle-input mr10" placeholder="请选择分类">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.name"
          :value="item.ID"
        />
      </el-select>
      <el-select v-model="params.state" class="handle-input mr10" placeholder="请选择状态">
        <el-option label="请选择" value="0" />
        <el-option label="已发布" value="1" />
        <el-option label="未发布" value="4" />
        <el-option label="回收站" value="2" />
        <el-option label="加密" value="3" />
      </el-select>
      <el-input v-model="params.title" placeholder="文章名称" clearable class="handle-input mr10" />
      <el-button type="primary" icon="el-icon-search" @click="getList(1)">搜 索</el-button>
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
      <el-table-column type="selection" :selectable="isSelect" width="55" align="center"/>
      <el-table-column prop="ID" label="ID" width="55" align="center"/>
      <el-table-column width="180" prop="title" label="文章标题" />
      <el-table-column prop="summary" label="简介" />
      <el-table-column prop="img" label="封面图" width="160" align="center">
        <template #default="scope">
          <el-image fit="contain" style="height: 60px" :src="scope.row.img" :preview-src-list="[scope.row.img]" />
        </template>
      </el-table-column>
      <el-table-column width="120" prop="category_name" label="分类名称" align="center" />
      <el-table-column width="80" prop="comment_count" label="评论数" align="center" />
      <el-table-column width="80" prop="visit_count" label="浏览数" align="center" />
      <el-table-column width="180" prop="CreatedAt" label="创建时间" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button 
            type="text"
            icon="el-icon-document"
            @click="seeDetail(scope.row)"
            >查看</el-button
          >
          <el-button
            v-if="scope.row.edit"
            type="text"
            icon="el-icon-edit"
            @click="$router.push({path: '/arcitle/add', query: {id: scope.row.ID}})"
            >编辑</el-button
          >
          <Pop
            :text="scope.row.is_recycled ? '恢复' : '回收'"
            :title="'确定要' + (scope.row.is_recycled ? '恢复' : '回收') + '吗？'"
            buttonIcon="el-icon-takeaway-box"
            @confirm="recycled(scope.row.is_recycled ? false : true, scope.row.ID)"
          />
          <template v-if="$store.state.user.userInfo.userId == 1 && scope.row.is_published">
            <Pop text="上移" title="确定要上移排序吗？" buttonIcon="el-icon-arrow-up" @confirm="moveOrderArticle(true, scope.row)" />
            <Pop text="下移" title="确定要上移排序吗？" buttonIcon="el-icon-arrow-down" @confirm="moveOrderArticle(false, scope.row)" />
          </template>
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
      />
    </div>
    <Pwd 
      :showModel="showPwd"
      :id="id"
      @close-modal="showPwd = false"
    />
  </div>
</template>

<script>
import { 
  getCategoryList,
  getArcitleList, 
  editPublish,
  editTop,
  editCommented,
  editRecovery,
  delArticle,
  moveOrder
} from "../../api/index"
import { formatTime } from "../../utils/index"
import PopConfirm from "../../components/popconfirm.vue"
import { 
  defineComponent, 
  toRefs,
  reactive,
  onMounted
} from "vue"
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Pwd from "./modal/pwd.vue"
export default defineComponent({
  name: "arcitle-list",
  components: { Pop: PopConfirm, Pwd },
  setup() {
    const router = useRouter()
    const store = useStore()
    const data = reactive({
      params: {
        title: "",
        page: 1,
        pageSize: 10,
        state: '',
        category_id: '',
        ids: []
      },
      pageTotal: 0,
      tableData: [],
      multipleSelection: [],
      options: [],
      loading: false,
      showPwd: false,
      id: 0
    })
    const getList = (page) => {
      data.loading = true
      if (page) {
        data.params.page = 1
      }
      getArcitleList(data.params).then((res) => {
        res.data.data.forEach((item) => {
          item.CreatedAt = formatTime(item.CreatedAt)
        })
        data.tableData = res.data.data
        data.pageTotal = res.data.total
        data.loading = false
      }).catch(() => data.loading = false)
    }

    // 获取分类列表
    const getCategory = () => {
      getCategoryList({ pageSize: 1000 }).then((res) => {
        data.options = res.data.data
      })
    }

    // 多选操作
    const handleSelectionChange = (val) => {
      data.multipleSelection = val
    }

    const delAllSelection = () => {
      delArticle({ ids: data.multipleSelection.map(item => item.ID) }).then(() => getList())
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

    onMounted(() => {
      getList()
      getCategory()
    })

    const moveOrderArticle = (direction, data) => {
      moveOrder({
        id: data.ID,
        order_id: data.order_id,
        is_top: data.is_top,
        direction
      }).then(() => getList())
    }

    const seeDetail = row => {
      if (!row.captcha && store.user.userInfo.userId) {
        router.push({path: '/arcitle/add', query: {see: true, id: row.ID}})
      } else {
        data.id = row.ID
        data.showPwd = true
      }
    }

    return { 
      ...toRefs(data),
      getList,
      handleSelectionChange,
      delAllSelection,
      handlePageChange,
      isSelect,
      publish,
      recycled,
      top,
      comment,
      del,
      moveOrderArticle,
      seeDetail
    }
  }
})
</script>

<style scoped lang="scss">
@import "../../assets/css/element.scss";
</style>
