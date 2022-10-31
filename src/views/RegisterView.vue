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
      <div class="form-group">
        <label for="username">Username</label>
        <input
          v-model="user.username"
          required
          type="text"
          class="form-control"
          id="username"
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
import firebase from "@/Firebase.js";
// import { useToast } from "vue-toastification";
// const toast = useToast();

export default {
  name: "RegisterView",
  components: {},
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      error: "",
    };
  },
  methods: {
    handleSubmit: function () {
      const { email, password, username } = this.user;

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          res.user
            .updateProfile({
              displayName: username,
            })
            .then(() => {
              this.$router.push({ name: "LoginView" });
              this.error = "";
            });
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
  },
  beforeCreate() {
    const user = localStorage.getItem("user");
    if (user) {
      this.$router.push({ name: "HomeView" });
    }
  },
};
</script>

<style lang="scss" scoped>
form {
  max-width: 500px;
}
</style>
