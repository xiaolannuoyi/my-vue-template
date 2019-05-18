import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Layout from "@/views/layout/layout";

//如首页和登录页和一些不用权限的公用页面
export const commontRouterMap = [{
    path: "/login",
    hidden: true, //不在slider显示
    component: () =>
        import("@/views/login/index")
},
{
    path: "/",
    component: Layout,
    redirect: "/home",
    name: "Home",
    hidden: true,
    children: [{
        path: "home",
        component: () =>
            import("@/views/Home")
    }]
}
];


//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [{
    path: "/home",
    component: Layout,
    meta: { title: "Home", icon: "el-icon-menu" }
},
{
    path: "/userpower1",
    component: Layout,
    redirect: "/userpower1/1-1",
    name: "userpower1",
    meta: { title: "权限测试1", icon: "el-icon-tickets", role: ['0', '1', '2'] },
    children: [{
        path: "1-1",
        name: "1-1",
        component: () =>
            import("@/views/userpower1/1-1"),
        meta: { title: "1-1", role: ['0'] },
    },
    {
        path: "1-2",
        name: "1-2",
        component: () =>
            import("@/views/userpower1/1-2"),
        hidden: ['0'],//用户角色为0时，隐藏
        meta: { title: "1-2", role: ['0', '1', '2'] }//role 有0，可以通过某页跳转到这个路由
    },
    {
        path: "1-3",
        name: "1-3",
        component: () =>
            import("@/views/userpower1/1-3"),
        meta: { title: "1-1", role: ['0'] },
        hidden: true,//不在sidebar显示，由sidebar中的某路由跳转到这个页面,本例由1-2跳转，因此role与1-2同
        meta: { title: "1-3", role: ['0', '1', '2'] }
    }

    ]
},
{
    path: "/userpower2",
    component: Layout,
    redirect: "/userpower2/tree",
    name: "userpower2",
    meta: { title: "权限测试2", icon: "el-icon-tickets", role: ['0', '1'] },
    children: [{
        path: "2-1",
        name: "2-1",
        component: () =>
            import("@/views/userpower2/2-1"),
        meta: { title: "2-1", role: ['0'] }
    },
    {
        path: "2-2",
        name: "2-2",
        component: () =>
            import("@/views/userpower2/2-2"),
        hidden: ['0'],//用户角色为0时，隐藏
        meta: { title: "2-2", role: ['0', '1'] }
    }]
},


{
    path: "/nested",
    component: Layout,
    redirect: "/nested/menu1",
    name: "Nested",
    meta: {
        title: "多级菜单",
        icon: "el-icon-news"
    },
    children: [{
        path: "menu1",
        component: () =>
            import("@/views/nested/menu1/index"), // Parent router-view
        name: "Menu1",
        meta: { title: "Menu1" },
        children: [{
            path: "menu1-1",
            component: () =>
                import("@/views/nested/menu1/menu1-1/index"),
            name: "Menu1-1",
            meta: { title: "Menu1-1" }
        },
        {
            path: "menu1-2",
            component: () =>
                import("@/views/nested/menu1/menu1-2/index"),
            name: "Menu1-2",
            meta: { title: "Menu1-2" },
            children: [{
                path: "menu1-2-1",
                component: () =>
                    import("@/views/nested/menu1/menu1-2/menu1-2-1/index"),
                name: "Menu1-2-1",
                meta: { title: "Menu1-2-1" }
            },
            {
                path: "menu1-2-2",
                component: () =>
                    import("@/views/nested/menu1/menu1-2/menu1-2-2/index"),
                name: "Menu1-2-2",
                meta: { title: "Menu1-2-2" }
            }
            ]
        },
        {
            path: "menu1-3",
            component: () =>
                import("@/views/nested/menu1/menu1-3/index"),
            name: "Menu1-3",
            meta: { title: "Menu1-3" }
        }]

    },
    {
        path: "menu2",
        component: () =>
            import("@/views/nested/menu2/index"),
        meta: { title: "menu2" }
    }
    ]
}
];


//实例化vue的时候只挂载commontRouterMap
const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: commontRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router;
