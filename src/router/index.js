import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ForgotPasswordView from "../views/ForgotPasswordView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import PostsListView from "../views/PostsListView.vue";
import PostView from "../views/PostView.vue";

import { auth } from "@/Firebase";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/posts",
    name: "PostsListView",
    component: PostsListView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/posts/:id",
    name: "PostView",
    component: PostView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/forgotPassword",
    name: "ForgotPasswordView",
    component: ForgotPasswordView,
  },
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/register",
    name: "RegisterView",
    component: RegisterView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  if (requiresAuth && !auth.currentUser) {
    next({ name: "LoginView" });
  } else {
    next();
  }
});
export default router;
