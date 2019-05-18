import Vue from "vue";
import App from "./App.vue";
import router from "./router/";
import store from "./store/";
//配置element
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import "@/styles/index.scss"; // global css

Vue.use(ElementUI);
Vue.config.productionTip = false;

import "./permission";
import "../mock"; //mock.js
import serviceManger from "@/service/index"; //请求服务的所有代码
Vue.prototype.$serviceManger = serviceManger; //其中$xx为新命的名。全局引入

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");