<template>
  <div class="container">
    <div class="card" style="width: 18rem">
      <img
        src="@/assets/img/product-1.jpeg"
        class="card-img-top"
        alt="product1"
      />
      <p class="card-body" v-if="loading">Loading...</p>
      <div v-else class="card-body">
        <h5 class="card-title">{{ user.displayName }}</h5>
        <p class="card-text">
          {{ user.email }}
        </p>
        <button @click="logout" class="btn btn-primary">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "@/Firebase.js";

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      user: {},
      loading: false,
    };
  },
  methods: {
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          firebase.auth().onAuthStateChanged(() => {
            localStorage.removeItem("user");
            window.location.reload();
          });
        });
    },
  },
  created() {
    this.loading = true;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.loading = false;
      }
    });
  },
  beforeCreate() {
    const user = localStorage.getItem("user");
    if (!user) {
      this.$router.push({ name: "LoginView" });
    }
  },
};
</script>

<style lang="scss" scoped></style>
