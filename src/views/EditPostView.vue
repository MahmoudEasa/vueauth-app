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
              placeholder="Add Post"
              class="p-3 d-block w-100 mb-3"
              rows="10"
              v-model.trim="content"
            ></textarea>

            <button
              @click="this.$router.push({ name: `PostsListView` })"
              class="btn btn-info"
            >
              Back
            </button>

            <button @click="updatePosts" class="btn btn-primary ml-2">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { useToast } from "vue-toastification";
import { doc, getDoc } from "@firebase/firestore";
import { postsCollection } from "@/Firebase";
const toast = useToast();

export default {
  name: "EditPostView",
  components: {},
  data() {
    return {
      content: "",
    };
  },
  computed: {
    ...mapState(["userProfile", "posts"]),

    postId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions(["updatePost"]),

    async updatePosts() {
      const content = this.content;
      if (content) {
        try {
          await this.updatePost({ id: this.postId, content });
        } catch (err) {
          console.log(err);
        }
        // this.$store.dispatch("createPost", content);
      } else {
        toast.warning("Please Add Post");
      }
    },
  },
  async created() {
    const res = await getDoc(doc(postsCollection, this.postId));
    this.content = res.data().content;
  },
  beforeCreate() {},
};
</script>

<style lang="scss" scoped>
textarea {
  outline: none;
}
</style>
