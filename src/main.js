import { createApp } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import Toast from "vue-toastification";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "@/Firebase";

import "vue-toastification/dist/index.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const options = {
  // You can set your default options here
};

let app;
onAuthStateChanged(auth, (user) => {
  if (!app) {
    app = createApp(App)
      .use(Toast, options)
      .use(store)
      .use(router)
      .mount("#app");
  }

  if (user) {
    store.dispatch("fetchUserProfile", user);
    store.dispatch("getDataAction");
  }
});
