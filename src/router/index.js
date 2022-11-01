import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ForgotPasswordView from "../views/ForgotPasswordView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";

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
    path: "/about",
    name: "AboutView",
    component: AboutView,
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
