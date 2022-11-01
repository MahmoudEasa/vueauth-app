import { createStore } from "vuex";
import * as fb from "@/Firebase";
import router from "@/router";

fb.postsCollection.orderBy("createOn", "desc").onSnapshot((snapshot) => {
  let postArray = [];
  snapshot.forEach((doc) => {
    let post = { ...doc.data(), id: doc.id };

    postArray.push(post);
  });

  store.commit("setPosts", postArray);
});

const store = createStore({
  state: {
    // userProfile: JSON.parse(localStorage.getItem("user")),
    userProfile: null,
    posts: [],
    error: "",
  },
  getters: {},
  mutations: {
    setUserProfile: (state, val) => {
      state.userProfile = val;
    },
    setPosts: (state, val) => {
      state.posts = val;
    },
    setError: (state, val) => {
      state.error = val;
    },
  },
  actions: {
    async login({ dispatch, commit }, form) {
      try {
        const { user } = await fb.auth.signInWithEmailAndPassword(
          form.email,
          form.password
        );
        dispatch("fetchUserProfile", user);
      } catch (err) {
        commit("setError", err.message);
      }
    },

    async register({ dispatch, commit }, form) {
      try {
        const { user } = await fb.auth.createUserWithEmailAndPassword(
          form.email,
          form.password
        );

        await fb.userCollection.doc(user.uid).set({
          name: form.name,
          title: form.title,
          email: form.email,
        });

        dispatch("fetchUserProfile", user);
      } catch (err) {
        commit("setError", err.message);
      }
    },

    async fetchUserProfile({ commit }, user) {
      //, state
      const userProfile = await fb.userCollection.doc(user.uid).get();
      commit("setUserProfile", userProfile.data());

      // console.log(userProfile.data());
      // console.log(state.userProfile.name);

      if (
        router.currentRoute.value.path === "/login" ||
        router.currentRoute.value.path === "/register"
      ) {
        router.push({ name: "HomeView" });
      }
    },

    async logout({ commit }) {
      await fb.auth.signOut();
      commit("setUserProfile", null);
      router.push({ name: "LoginView" });
    },

    createPost({ state }, content) {
      fb.postsCollection.add({
        createOn: new Date(),
        content,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
      });
    },

    deletePost(_, id) {
      fb.postsCollection.doc(id).delete();
    },
  },
  modules: {},
});

export default store;
