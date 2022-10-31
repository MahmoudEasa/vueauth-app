<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top mb-4">
    <router-link :to="{ name: 'HomeView' }" class="navbar-brand"
      >VueJs</router-link
    >
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <li v-if="user" class="ml-auto">Hello, {{ user.displayName }}</li>

      <ul class="navbar-nav ml-auto">
        <li v-if="user" class="nav-item">
          <router-link :to="{ name: 'HomeView' }" class="nav-link"
            >Home</router-link
          >
        </li>
        <li v-if="user" class="nav-item">
          <router-link :to="{ name: 'AboutView' }" class="nav-link"
            >About</router-link
          >
        </li>
        <li v-if="!user" class="nav-item">
          <router-link :to="{ name: 'LoginView' }" class="nav-link"
            >Login</router-link
          >
        </li>
        <li v-if="!user" class="nav-item">
          <router-link :to="{ name: 'RegisterView' }" class="nav-link"
            >Register</router-link
          >
        </li>
        <li v-if="user" class="nav-item">
          <button @click="logout" class="btn btn-info">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import firebase from "@/Firebase.js";

export default {
  name: "NavbarComp",
  components: {},
  data() {
    return {
      user: "",
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
    const userFind = localStorage.getItem("user");
    if (userFind) {
      this.user = JSON.parse(userFind);
    }
  },
};
</script>

<style lang="scss" scoped>
$mainColor: #42b983;

li {
  color: #fff !important;
  :hover {
    color: $mainColor !important;
  }
  a {
    font-weight: bold;
    color: inherit !important;
    &.router-link-exact-active {
      color: $mainColor !important;
    }
  }
}
</style>
