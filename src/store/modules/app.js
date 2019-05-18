const app = {
  state: {
    sidebar: {
      opened: true,
      withoutAnimation: false
    }
  },
  mutations: {
    //slider切换
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
    }
  },
  getters: {
    getsidebar: state => state.sidebar
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit("TOGGLE_SIDEBAR");
    }
  }
};
export default app;
