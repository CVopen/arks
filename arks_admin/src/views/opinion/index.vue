<template>
  <div class="container">
    <el-tabs v-model="activeName">
      <el-tab-pane
        v-for="(item, index) in tagItem"
        :key="index"
        :label="`${item.title}(${dataList[item.tag+'List'].length})`" 
        :name="item.tag"
      >
        <el-table :data="dataList[item.tag+'List']" :show-header="false" style="width: 100%">
          <el-table-column prop="CreatedAt" width="180" align="center" />
          <el-table-column prop="user_name" width="180" align="center" />
          <el-table-column>
            <template #default="scope">
              <span class="message-title">{{ scope.row.content }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="activeName === 'third'" prop="message" width="180" align="center" />
          <el-table-column width="180" align="center">
            <template #default="scope">
              <el-image
                v-if="scope.row.images.length > 0"
                fit="contain" 
                style="height: 60px"
                :src="scope.row.images[0]"
                :preview-src-list="scope.row.images">
              </el-image>
            </template>
          </el-table-column>
          <el-table-column width="120">
            <template #default="scope">
              <el-button v-if="activeName === 'first'" size="small" @click="handleClick(scope.row.ID, 2)">处理</el-button>
              <el-button v-else-if="activeName === 'second'" size="small" @click="handleClick(scope.row.ID, 3)">完成</el-button>
              <el-button v-else size="small" @click="handleClick(scope.row.ID, 2)">重新处理</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { 
  defineComponent,
  reactive,
  toRefs,
  onMounted
} from 'vue'
import { getOpinionList, putOpinion } from '@/api'
import { formatTime } from "../../utils/index"
export default defineComponent({
  name: "opinion",
  setup() {
    const data = reactive({
      activeName: 'first',
      tagItem: [
        { title: '待处理', tag: 'first' },
        { title: '处理中', tag: 'second' },
        { title: '处理完成', tag: 'third' }
      ],
      dataList: {
        firstList: [],
        secondList: [],
        thirdList: []
      }
    })

    const handleClick = (id, state) => {
      putOpinion({ id, state }).then(getList)
    }

    const getList = () => {
      getOpinionList().then(res => {
        const firstList = []
        const secondList = []
        const thirdList = []
        res.data.forEach(element => {
          switch (element.state) {
            case 1:
              firstList.push(element)
              break;
            case 2:
              secondList.push(element)
              break;
            case 3:
              thirdList.push(element)
              break;
          }
          element.images = element.images.split(';')
          element.CreatedAt = formatTime(element.CreatedAt)
        })
        data.dataList.firstList = firstList
        data.dataList.secondList = secondList
        data.dataList.thirdList = thirdList
      })
    }

    onMounted(getList)

    return {
      ...toRefs(data),
      handleClick
    }
  }
})
</script>

<style lang="scss">
.message-title {
  cursor: pointer;
}
.el-tabs__nav {
  .is-active {
    color: #ff69b4;
  }
  .el-tabs__item {
    &:hover {
      color: #ff69b4 !important;
    }
  }
  .el-tabs__active-bar {
    background-color: #ff69b4;
  }
}
.el-table th,.el-table tr {
  background-color: rgba(255, 255, 255, 0.5) !important;
  &:hover {
    background-color: rgba(255, 255, 255, 0.5) !important;
  }
}
.el-table, .el-table__expanded-cell {
  background-color: transparent !important;
}
</style>
