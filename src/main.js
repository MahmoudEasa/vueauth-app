import { createApp } from "vue";
import Toast from "vue-toastification";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "vue-toastification/dist/index.css";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const options = {
  // You can set your default options here
};
createApp(App).use(Toast, options).use(store).use(router).mount("#app");
