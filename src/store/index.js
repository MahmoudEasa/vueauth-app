import { createStore } from "vuex";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  orderBy,
  query,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  getAuth,
} from "firebase/auth";
import * as fb from "@/Firebase";
import router from "@/router";
import { useToast } from "vue-toastification";
const toast = useToast();

const auth = getAuth();

const getData = async () => {
  store.state.loading = true;
  try {
    const q = query(fb.postsCollection, orderBy("createOn", "desc"));

    const querySnapshot = await getDocs(q);
    let postArray = [];
    querySnapshot.forEach((doc) => {
      let post = { ...doc.data(), id: doc.id };

      postArray.push(post);
    });

    store.commit("setPosts", postArray);

    store.state.loading = false;
    console.log(store.state.loading);
  } catch (err) {
    toast.error(err.message);
  }
};

// fb.postsCollection.orderBy("createOn", "desc").onSnapshot((snapshot) => {
//   let postArray = [];
//   snapshot.forEach((doc) => {
//     let post = { ...doc.data(), id: doc.id };

//     postArray.push(post);
//   });

//   store.commit("setPosts", postArray);
// });

const store = createStore({
  state: {
    // userProfile: JSON.parse(localStorage.getItem("user")),
    userProfile: null,
    posts: [],
    postsFiltered: [],
    error: "",
    loading: false,
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
    searchPost: (state, val) => {
      const reg = new RegExp(val, "i");
      const filteredPosts = state.posts.filter((post) =>
        post.userName.match(reg)
      );

      state.postsFiltered = filteredPosts;
      // console.log(state.postsFiltered);
    },
  },
  actions: {
    getDataAction() {
      getData();
    },

    async login({ dispatch, commit }, form) {
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
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
        const { user } = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );

        await setDoc(doc(fb.userCollection, user.uid), {
          name: form.name,
          title: form.title,
          email: form.email,
        });

        // await fb.userCollection.doc(user.uid).set({
        //   name: form.name,
        //   title: form.title,
        //   email: form.email,
        // });

        dispatch("fetchUserProfile", user);
      } catch (err) {
        commit("setError", err.message);
      }
    },

    async fetchUserProfile({ commit }, user) {
      //, state
      // const userProfile = await fb.userCollection.doc(user.uid).get();
      try {
        const userProfile = await getDoc(doc(fb.userCollection, user.uid));
        commit("setUserProfile", userProfile.data());

        if (
          router.currentRoute.value.path === "/login" ||
          router.currentRoute.value.path === "/register" ||
          router.currentRoute.value.path === "/forgotPassword"
        ) {
          router.push({ name: "HomeView" });
        }
      } catch (err) {
        toast.error(err.message);
      }
    },

    async logout({ commit }) {
      // await fb.auth.signOut();
      try {
        await signOut(auth);
        commit("setUserProfile", null);
        router.push({ name: "LoginView" });
      } catch (err) {
        toast.error(err.message);
      }
    },

    async forgotPasswordView({ commit }, email) {
      try {
        await sendPasswordResetEmail(auth, email);
        commit("setError", "");
        toast("Check You Mail");
      } catch (err) {
        commit("setError", err.message);
      }
    },

    async createPost({ state }, content) {
      try {
        await addDoc(fb.postsCollection, {
          createOn: new Date(),
          content,
          userId: auth.currentUser.uid,
          userName: state.userProfile.name,
        });

        toast("Created Is Done");

        getData();
      } catch (err) {
        toast.error(err.message);
      }

      // fb.postsCollection.add({
      //   createOn: new Date(),
      //   content,
      //   userId: fb.auth.currentUser.uid,
      //   userName: state.userProfile.name,
      // });
    },

    async updatePost(_, data) {
      try {
        const postData = await getDoc(doc(fb.postsCollection, data.id));
        const postUpdated = { ...postData.data(), content: data.content };
        await setDoc(doc(fb.postsCollection, data.id), postUpdated);

        getData();
        toast("Updated Is Done");
      } catch (err) {
        toast.error("You Can Update Just Your Posts");
      }
    },

    async deletePost({ state }, id) {
      let deleted;
      try {
        await deleteDoc(doc(fb.postsCollection, id));
        getData();
        state.loading = false;
        toast("Deleted Is Done");
        deleted = true;
      } catch (err) {
        toast.error("You Can Delete Just Your Posts");
        deleted = false;
      }
      // fb.postsCollection.doc(id).delete();

      return deleted;
    },
  },
  modules: {},
});

export default store;
