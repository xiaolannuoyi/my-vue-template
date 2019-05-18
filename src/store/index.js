import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import user from "./modules/user";
import router from "./modules/router";
import app from "./modules/app";

export default new Vuex.Store({
  modules: {
    user,
    router,
    app
  }
});
