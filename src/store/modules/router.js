import { asyncRouterMap, commontRouterMap } from "@/router";


function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return route.meta.role.includes(roles)
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }

    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      if (tmp.hidden && typeof tmp.hidden !== 'boolean') {
        tmp.hidden = tmp.hidden.includes(roles) ? true : false;
      }
      res.push(tmp)
    }
  })

  return res
}


const router = {
  state: {
    routers: commontRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = commontRouterMap.concat(routers);
    }
  },
  getters: {
    getaddRouters: state => state.addRouters,
    getrouters: state => state.routers
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        let accessedRouters = filterAsyncRoutes(asyncRouterMap, roles)
        console.log("accessedRouters", accessedRouters);

        commit("SET_ROUTERS", accessedRouters);
        resolve();
      });
    }
  }
};

export default router;
