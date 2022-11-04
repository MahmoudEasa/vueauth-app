<template>
  <div class="container">
    <div class="col">
      <div class="card" style="width: 100%">
        <img
          src="https://picsum.photos/200/70/?image=25"
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
            <button
              @click="
                this.$router.push({ name: `PostView`, params: { id: post.id } })
              "
              class="btn btn-info"
            >
              View
            </button>
            <button
              @click="
                this.$router.push({
                  name: `EditPostView`,
                  params: { id: post.id },
                })
              "
              class="btn btn-primary mx-2"
            >
              Edit
            </button>
            <button @click="deletePost(post.id)" class="btn btn-danger">
              Delete
            </button>
            <!-- <router-link :to="{ name: 'PostView', param: post.id }">
            </router-link> -->

            <hr />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";

export default {
  name: "PostsListView",
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapState(["posts"]),

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
    ...mapActions(["deletePost"]),
  },
};
</script>
