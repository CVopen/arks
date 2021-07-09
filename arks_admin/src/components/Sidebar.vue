<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#ff69b4"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon" style="color:#fff"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                  >{{ threeItem.title }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.index"
                :key="subItem.index"
                >{{ subItem.title }}</el-menu-item
              >
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon" style="color:#fff"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
// import bus from "../common/bus";
export default {
  data() {
    return {
      items: [
        {
          icon: "el-icon-lx-home",
          index: "home",
          title: "系统首页"
        },
        {
          icon: "el-icon-lx-cascades",
          index: "category",
          title: "类别",
          subs: [
            {
              index: "/category/list",
              title: "文章分类"
            },
            {
              index: "/category/tag",
              title: "文章标签"
            }
          ]
        },
        {
          icon: "el-icon-lx-copy",
          index: "arcitle",
          title: "文章",
          subs: [
            {
              index: "/arcitle/list",
              title: "文章列表"
            },
            {
              index: "/arcitle/add",
              title: "添加文章"
            }
          ]
        },
        {
          icon: "el-icon-lx-copy",
          index: "tabs",
          title: "tab选项卡"
        },
        {
          icon: "el-icon-lx-calendar",
          index: "3",
          title: "表单相关",
          subs: [
            {
              index: "upload",
              title: "文件上传"
            }
          ]
        },
        {
          icon: "el-icon-lx-emoji",
          index: "icon",
          title: "自定义图标"
        },
        {
          icon: "el-icon-pie-chart",
          index: "charts",
          title: "schart图表"
        },
        {
          icon: "el-icon-lx-global",
          index: "i18n",
          title: "国际化功能"
        },
        {
          icon: "el-icon-lx-warn",
          index: "7",
          title: "错误处理",
          subs: [
            {
              index: "permission",
              title: "权限测试"
            },
            {
              index: "404",
              title: "404页面"
            }
          ]
        }
      ]
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "")
    },
    collapse() {
      return this.$store.state.app.collapse
    }
  }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}

::v-deep(.el-menu) {
  border: none;
}
::v-deep(.el-menu ::before, ::after) {
  background-color: transparent !important;
}
::v-deep(.el-menu-item:hover) {
  background-color: rgba(255, 105, 180, 0.7) !important;
}
::v-deep(.el-submenu__title:hover) {
  background-color: rgba(255, 105, 180, 0.7) !important;
}
::v-deep(.is-active i) {
  color: #ff69b4 !important;
}
::v-deep(.is-opened i) {
  color: #fff !important;
}
</style>
