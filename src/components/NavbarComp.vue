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
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'HomeView' }" class="nav-link"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'AboutView' }" class="nav-link"
            >About</router-link
          >
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'ForgotPasswordView' }" class="nav-link"
            >ForgotPassword</router-link
          >
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'LoginView' }" class="nav-link"
            >Login</router-link
          >
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'RegisterView' }" class="nav-link"
            >Register</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarComp",
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
$mainColor: #42b983;

li {
  :hover {
    color: $mainColor !important;
  }
  a {
    font-weight: bold;
    color: #fff !important;
    &.router-link-exact-active {
      color: $mainColor !important;
    }
  }
}
</style>
