<template>
  <div class="about">
    <v-header />
    <v-sidebar />
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <v-tags></v-tags>
      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
        <!-- <el-backtop target=".content"></el-backtop> -->
      </div>
    </div>
  </div>
</template>
<script>
import vHeader from "../components/Header"
import vSidebar from "../components/Sidebar"
import vTags from "../components/Tags.vue"
import Session from '../utils/sessionStorage'
export default {
  components: {
    vHeader,
    vSidebar,
    vTags
  },
  mounted() {
    const userInfo = Session('get', 'userInfo')
    if (userInfo) {
      this.$store.commit('user/setInfo', JSON.parse(userInfo))
    }
    const config = Session('get', 'config')
    if (config) {
      console.log(123)
      this.$store.commit('app/setConfig', JSON.parse(config))
    }
  },
  computed: {
    collapse() {
      return this.$store.state.app.collapse
    }
  }
}
</script>
<style scoped lang="scss">
.content {
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(
      150deg,
      #3f51b1 0%,
      #5a55ae 13%,
      #7b5fac 25%,
      #8f6aae 38%,
      #a86aa4 50%,
      #cc6b8e 62%,
      #f18271 75%,
      #f3a469 87%,
      #f7c978 100%
    );
  }
  &::-webkit-scrollbar-track {
    background: #e7deea;
  }
}

::v-deep(.el-card) {
  background-color: rgba(255, 255, 255, 0.6) !important;
}
</style>
