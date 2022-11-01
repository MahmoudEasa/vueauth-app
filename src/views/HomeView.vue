<template>
  <div class="container-fluid">
    <div class="row m-auto">
      <div class="col-12 col-md-5 mb-4">
        <div class="card" style="width: 100%">
          <img
            src="https://picsum.photos/600/500/?image=25"
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

      <div class="col-12 col-md-7">
        <div class="card" style="width: 100%">
          <img
            src="https://picsum.photos/600/500/?image=25"
            class="card-img-top"
            alt="photo"
          />
          <h5 class="card-title" v-if="!posts.length">Loading...</h5>
          <div v-else>
            <div class="card-body" v-for="post in posts" :key="post.userId">
              <h5 class="card-title text-center">
                <strong class="mb-1 d-block">Created By</strong>
                {{ post.userName }}
              </h5>
              <h5 class="card-title text-center">
                <strong class="mb-1 d-block">Created On</strong>
                {{ formatDate(post.createOn) }}
              </h5>
              <p class="card-title">
                <strong>Content:</strong><br />
                {{ trimLength(post.content) }}
              </p>
              <button @click="deletePost(post.id)" class="btn btn-primary">
                Delete
              </button>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
import { useToast } from "vue-toastification";
const toast = useToast();
// import firebase from "@/Firebase.js";

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
    ...mapState(["userProfile", "posts"]),
    formatDate() {
      return (val) => {
        if (!val) {
          return "No Date";
        }
        let date = val.toDate();
        return moment(date).fromNow();
        // return moment(date).format("MMMM Do YYYY, h:mm:ss a");
      };
    },
    trimLength() {
      return (val) => {
        if (val.length <= 200) {
          return val;
        } else {
          return val.slice(0, 200) + "...";
        }
      };
    },
  },
  methods: {
    ...mapActions(["createPost", "deletePost"]),
    createPosts() {
      const content = this.post.content;
      if (content) {
        this.createPost(content);
        // this.$store.dispatch("createPost", content);
        this.post.content = "";
      } else {
        toast.warning("Please Add Post");
      }
    },
  },
  filters: {
    // formatDate(val) {
    //   if (!val) {
    //     return "No Date";
    //   }
    //   let date = val.toDate();
    //   return moment(date).fromNow();
    //   // return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    // },
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
