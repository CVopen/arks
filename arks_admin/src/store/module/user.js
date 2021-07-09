export default {
  namespaced: true,
  state: () => ({
    userInfo: {}
  }),
  mutations: {
    setInfo(state, data) {
      state.userInfo = data
    },
    clearInfo(state) {
      state.userInfo = {}
    },
  },
  actions: {},
  getters: {}
}