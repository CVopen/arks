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
      <template v-for="item in router">
        <template v-if="!item.hidden">
          <template v-if="item.children">
            <el-submenu :index="item.meta.index" :key="item.meta.index">
              <template #title>
                <i :class="item.meta.icon" style="color:#fff"></i>
                <span>{{ item.meta.title }}</span>
              </template>
              <template v-for="subItem in item.children" :key="subItem.meta.index">
                <el-menu-item :index="subItem.meta.index">{{ subItem.meta.title }}</el-menu-item>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.meta.index" :key="item.meta.index">
              <i :class="item.meta.icon" style="color:#fff"></i>
              <template #title>{{ item.meta.title }}</template>
            </el-menu-item>
          </template>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
// import bus from "../common/bus";
export default {
  computed: {
    onRoutes() {
      return this.$route.path
    },
    collapse() {
      return this.$store.state.app.collapse
    },
    router() {
      return this.$router.options.routes
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
