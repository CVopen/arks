<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="grid-content grid-con-1">
            <img src="../../assets/img/docs.svg" />
            <div class="grid-cont-right">
              <div class="grid-num">{{ visit.ACount }}</div>
              <div>文章数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="grid-content grid-con-2">
            <img src="../../assets/img/see.svg" />
            <div class="grid-cont-right">
              <div class="grid-num">{{ visit.visit_count }}</div>
              <div>用户访问量</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="grid-content grid-con-3">
            <img src="../../assets/img/message.svg" />
            <div class="grid-cont-right">
              <div class="grid-num">{{ visit.visit_day_count }}</div>
              <div>每日访问量</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <schart
            ref="bar"
            class="schart"
            canvasId="bar"
            :options="options"
          ></schart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <schart
            ref="line"
            class="schart"
            canvasId="line"
            :options="options2"
          ></schart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Schart from "vue-schart"
import { getVisit } from '@/api'
import Session from "../../utils/sessionStorage"
import { 
  defineComponent,
  reactive,
  onMounted,
  toRefs
} from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: "dashboard",
  components: { Schart },
  setup() {
    const store = useStore()
    const data = reactive({
      visit: {},
      data: [
        {
          name: "2018/09/04",
          value: 1083
        },
        {
          name: "2018/09/05",
          value: 941
        },
        {
          name: "2018/09/06",
          value: 1139
        },
        {
          name: "2018/09/07",
          value: 816
        },
        {
          name: "2018/09/08",
          value: 327
        },
        {
          name: "2018/09/09",
          value: 228
        },
        {
          name: "2018/09/10",
          value: 1065
        }
      ],
      options: {
        type: "bar",
        title: {
          text: "最近一周各品类销售图"
        },
        xRorate: 25,
        labels: ["周一", "周二", "周三", "周四", "周五"],
        datasets: [
          {
            label: "家电",
            data: [234, 278, 270, 190, 230]
          },
          {
            label: "百货",
            data: [164, 178, 190, 135, 160]
          },
          {
            label: "食品",
            data: [144, 198, 150, 235, 120]
          }
        ]
      },
      options2: {
        type: "line",
        title: {
          text: "最近几个月各品类销售趋势图"
        },
        labels: ["6月", "7月", "8月", "9月", "10月"],
        datasets: [
          {
            label: "家电",
            data: [234, 278, 270, 190, 230]
          },
          {
            label: "百货",
            data: [164, 178, 150, 135, 160]
          },
          {
            label: "食品",
            data: [74, 118, 200, 235, 90]
          }
        ]
      }
    })

    const changeDate = () => {
      const now = new Date().getTime()
      data.data.forEach((item, index) => {
        const date = new Date(now - (6 - index) * 86400000)
        item.name = `${date.getFullYear()}/${date.getMonth() +
          1}/${date.getDate()}`
      })
    }
    const getAll = () => {
      getVisit().then(res => {
        data.visit = res.data
        store.commit('app/setConfig', res.data)
        Session("set", "config", res.data)
      })
    }

    onMounted(getAll)

    return {
      changeDate,
      ...toRefs(data)
    }
    
  }
})
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}
.grid-content img {
  height: 100px;
}
.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: #ff9f43;
}

.grid-con-2 .grid-num {
  color: #ff9f43;
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}
</style>
