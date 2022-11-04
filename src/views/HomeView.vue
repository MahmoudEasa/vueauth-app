<template>
  <div class="container">
    <div class="row m-auto">
      <div class="col">
        <div class="card" style="width: 100%">
          <img
            src="https://picsum.photos/200/70/?image=25"
            class="card-img-top"
            alt="photo"
          />
          <div class="card-body">
            <h5 class="card-title" v-if="!userProfile">Loading...</h5>
            <h5
              v-if="userProfile"
              class="card-title text-center font-weight-bold"
            >
              {{ userProfile.name }}
            </h5>
            <textarea
              v-if="userProfile"
              placeholder="Add Post"
              class="p-3 d-block w-100 mb-3"
              rows="10"
              v-model.trim="post.content"
            ></textarea>
            <button @click="createPosts" class="btn btn-primary">Create</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      user: {},
      post: {
        content: "",
      },
      loading: false,
    };
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    ...mapActions(["createPost"]),
    async createPosts() {
      const content = this.post.content;
      if (content) {
        try {
          await this.createPost(content);
          this.post.content = "";
        } catch (err) {
          console.log(err);
        }
        // this.$store.dispatch("createPost", content);
      } else {
        toast.warning("Please Add Post");
      }
    },
  },
  created() {},
  beforeCreate() {},
};
</script>

<style lang="scss" scoped>
textarea {
  outline: none;
}
</style>
