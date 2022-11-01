<template>
  <div class="container">
    <div
      v-if="error"
      class="alert alert-danger alert-dismissible fade show"
      role="alert"
    >
      {{ error }}
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
        @click="error = ''"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <form
      class="shadow p-4 m-auto border rounded"
      @submit.prevent="handleSubmit"
    >
      <h1 class="text-center pb-3">Register</h1>
      <div class="form-group">
        <label for="name">Name</label>
        <input
          v-model="user.name"
          required
          type="text"
          class="form-control"
          id="name"
        />
      </div>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          v-model="user.title"
          required
          type="text"
          class="form-control"
          id="title"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          v-model="user.email"
          required
          type="email"
          class="form-control"
          id="email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="user.password"
          required
          type="password"
          class="form-control"
          id="password"
        />
      </div>

      <button type="submit" class="btn btn-primary">Register</button>

      <p class="mt-4">
        Or you have an account
        <router-link :to="{ name: 'LoginView' }">Sign In</router-link>
      </p>
    </form>
  </div>
</template>

<script>
// import firebase from "@/Firebase.js";
// import { useToast } from "vue-toastification";
// const toast = useToast();

export default {
  name: "RegisterView",
  components: {},
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        title: "",
      },
      error: "",
    };
  },
  methods: {
    handleSubmit: function () {
      this.$store.dispatch("register", this.user).then(() => {
        this.error = this.$store.state.error;
      });
      // const { email, password, name } = this.user;
      // firebase
      //   .auth()
      //   .createUserWithEmailAndPassword(email, password)
      //   .then((res) => {
      //     res.user
      //       .updateProfile({
      //         displayName: name,
      //       })
      //       .then(() => {
      //         this.$router.push({ name: "LoginView" });
      //         this.error = "";
      //       });
      //   })
      //   .catch((err) => {
      //     this.error = err.message;
      //   });
    },
  },
  beforeCreate() {
    // if (this.$store.state.user) {
    //   this.$router.push({ name: "HomeView" });
    // }
  },
};
</script>

<style lang="scss" scoped>
form {
  max-width: 500px;
}
</style>
