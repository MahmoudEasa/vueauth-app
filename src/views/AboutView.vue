<template>
  <div class="container">
    <h1>AboutView</h1>
  </div>
</template>

<script>
export default {
  name: "AboutView",
  components: {},
  data() {
    return {};
  },
  methods: {},
  beforeCreate() {
    const user = localStorage.getItem("user");
    if (!user) {
      this.$router.push({ name: "LoginView" });
    }
  },
};
</script>

<style lang="scss" scoped></style>
