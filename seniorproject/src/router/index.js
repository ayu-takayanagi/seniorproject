import { createRouter, createWebHashHistory } from "vue-router";
import { getAuth } from "firebase/auth";
import HomeView from "../views/HomeView.vue";
import Library from "../views/Library.vue";
import Record from "../views/Record.vue";
import MonthlyReport from "../views/MonthlyReport.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/library",
    name: "library",
    component: Library,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/record",
    name: "record",
    component: Record,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/monthlyreport",
    name: "monthlyreport",
    component: MonthlyReport,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (getAuth().currentUser) {
      next();
    }
  } else {
    next();
  }
});
export default router;
