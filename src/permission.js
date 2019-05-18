import router from "./router/";
import store from "./store/";

const whiteList = ["/login"]; // 不重定向白名单

// main.js
router.beforeEach((to, from, next) => {
  console.log("路由拦截", to.path);
  console.log("store.getters.gettoken", store.getters.gettoken);

  if (store.getters.gettoken) {
    // 判断是否有token
    console.log("有token");

    if (to.path === "/login") {
      console.log("有token , 将要去登录页,转到首页");

      next({ path: "/" });
    } else {
      console.log("有token , 非 去登录页,");
      if (store.getters.getroles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        console.log("拉取用户信息");
        store
          .dispatch("GetInfo")
          .then(res => {
            // 拉取info
            const roles = res.result.roles;
            //根据角色 生成响应的路由
            store.dispatch("GenerateRoutes", { roles }).then(() => {
              //生成可访问的路由表
              router.addRoutes(store.getters.getaddRouters); // 动态添加可访问路由表
              // next();
              next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log("有用户信息,---");
        next(); //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    }
  } else {
    console.log("无token");

    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      console.log("--111");
      next();
    } else {
      console.log("--222");
      next("/login");
    }
  }
});
