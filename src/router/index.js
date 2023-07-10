import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "尚医通后台系统", icon: "el-icon-shopping-cart-2" }
      }
    ]
  },
  {
    path: "/yygh/hospset",
    component: Layout,
    redirect: "/yygh/hospset/list",
    name: "hospset",
    meta: { title: "医院管理", icon: "el-icon-s-help" },
    children: [
      {
        path: "list",
        name: "HospSetList",
        component: () => import("@/views/yygh/hospset/list.vue"),
        meta: { title: "医院设置列表", icon: "table" }
      },
      {
        path: "create",
        name: "HospSetCreate",
        component: () => import("@/views/yygh/hospset/form"),
        meta: { title: "添加医院设置", icon: "tree" }
      },
      {
        path: "edit/:id",
        name: "HospSetEdit",
        component: () => import("@/views/yygh/hospset/form"),
        meta: { title: "编辑医院设置", noCache: true },
        hidden: true
      },
      {
        path: "hosplist",
        name: "hosplist",
        component: () => import("@/views/yygh/hospital/list"),
        meta: { title: "医院列表", icon: "el-icon-ship" }
      },
      {
        path: "hospDetail/:id",
        component: () => import("@/views/yygh/hospital/show"),
        hidden: true,
        meta: { title: "医院详情", icon: "el-icon-house" }
      },
      {
        path: "hospital/schedule/:hoscode",
        name: "排班",
        component: () => import("@/views/yygh/hospital/schedule"),
        meta: { title: "排班", noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: "/cmn",
    component: Layout,
    redirect: "/cmn/list",
    name: "数据管理",
    alwaysShow: true,
    meta: { title: "数据管理", icon: "example" },
    children: [
      {
        path: "list",
        name: "数据字典",
        component: () => import("@/views/yygh/dict/list"),
        meta: { title: "数据字典", icon: "table" }
      }
    ]
  },
  {
    path: "/user",
    component: Layout,
    redirect: "/user/userInfo/list",
    name: "userInfo",
    meta: { title: "用户管理", icon: "table" },
    alwaysShow: true,
    children: [
      {
        path: "userInfo/list",
        name: "用户列表",
        component: () => import("@/views/yygh/user/list"),
        meta: { title: "用户列表", icon: "table" }
      },
      {
        path: "userInfo/authList",
        name: "认证审批列表",
        component: () => import("@/views/yygh/user/authList"),
        meta: { title: "认证审批列表", icon: "table" }
      },
      {
        path: "userInfo/show/:id",
        name: "用户查看",
        component: () => import("@/views/yygh/user/show"),
        meta: { title: "用户查看" },
        hidden: true
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
