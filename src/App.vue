<template>
  <NavbarCompVue />
  <router-view />
</template>

<script>
import NavbarCompVue from "./components/NavbarComp.vue";

export default {
  name: "App",
  components: {
    NavbarCompVue,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
* {
  list-style: none;
  text-decoration: none;
}

ul {
  margin: 0 !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
