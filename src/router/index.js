import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Protected from "../views/Protected.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import NotFound from "../views/NotFound.vue";
import categories from "../views/categories.vue";
import detail from "../views/detail.vue";
import Collect from "../views/Collect.vue";
import store from "@/store";

import MyList from '../components/MyList';
Vue.component(MyList.name, MyList);

import comment from '../components/comment';
Vue.component(comment.name, comment);

Vue.use(VueRouter);
function authcheck(to, from, next) {
  if (store.state.user !== null) {
    next();
  } else next("/login");
}
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/protected",
    name: "Protected",
    beforeEnter: authcheck,
    component: Protected,
    meta: { title: "Protected" }
  },
  {
    path: "/categories",
    name: "categories",
    component: categories,
    meta: { title: "categories" }
  },
  {
    path: "/Collect",
    name: "Collect",
    component: Collect,
    meta: { title: "Collect" }
  },
  {
    path: "/detail",
    name: "detail",
    component: detail,
    meta: { title: "detail" }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { title: "Login" }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { title: "Register" }
  },
  { path: "/404", component: NotFound, meta: { title: "Not Found" } },
  { path: "*", redirect: "/404" }
];

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
});

export default router;
