<template>
  <div class="container">
    <div class="col">
      <div class="card" style="width: 100%">
        <img
          src="https://picsum.photos/200/70/?image=25"
          class="card-img-top"
          alt="photo"
        />
        <h5 class="card-title" v-if="!postData">Loading...</h5>
        <div v-else>
          <div class="card-body">
            <h5 class="card-title text-center">
              <strong class="mb-1 d-block">Created By</strong>
              {{ postData.userName }}
            </h5>
            <h5 class="card-title text-center">
              <strong class="mb-1 d-block">Created On</strong>
              {{ formatDate(postData.createOn) }}
            </h5>
            <p class="card-title">
              <strong>Content:</strong><br />
              {{ trimLength(postData.content) }}
            </p>
            <button
              @click="deletePostMethod(postData.id)"
              class="btn btn-primary"
            >
              Delete
            </button>
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

    postData() {
      const id = this.$route.params.id;
      const post = this.posts.filter((p) => p.id == id);

      return post[0];
    },

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

    async deletePostMethod(id) {
      try {
        const deleted = await this.deletePost(id);

        if (deleted) {
          this.$router.push({ name: "PostsListView" });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
