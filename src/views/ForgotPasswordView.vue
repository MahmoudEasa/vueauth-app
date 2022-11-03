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
        <label for="email">Email</label>
        <input
          v-model="email"
          required
          type="email"
          class="form-control"
          id="email"
        />
      </div>

      <button type="submit" class="btn btn-primary">Reset Password</button>

      <p class="mt-4">
        <router-link :to="{ name: 'LoginView' }">Sign In</router-link>
      </p>
    </form>
  </div>
</template>

<script>
// import { sendPasswordResetEmail } from "firebase/auth";
// const auth = getAuth();
// import { auth } from "@/Firebase";

// import { useToast } from "vue-toastification";
// const toast = useToast();

export default {
  name: "ForgotPasswordView",
  components: {},
  data() {
    return {
      email: "",
      error: "",
    };
  },
  methods: {
    handleSubmit: function () {
      this.error = "";
      this.$store.dispatch("forgotPasswordView", this.email).then(() => {
        this.email = "";
        this.error = this.$store.state.error;
      });
    },
  },
  beforeCreate() {
    // if (this.$store.state.userProfile) {
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
