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
  try {
    const q = query(fb.postsCollection, orderBy("createOn", "desc"));

    const querySnapshot = await getDocs(q);
    let postArray = [];
    querySnapshot.forEach((doc) => {
      let post = { ...doc.data(), id: doc.id };

      postArray.push(post);
    });

    store.commit("setPosts", postArray);
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
          router.currentRoute.value.path === "/register"
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
        addDoc(fb.postsCollection, {
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

    async deletePost(_, id) {
      try {
        await deleteDoc(doc(fb.postsCollection, id));
        getData();
        toast("Deleted Is Done");
      } catch (err) {
        toast.error(err.message);
      }
      // fb.postsCollection.doc(id).delete();
    },
  },
  modules: {},
});

export default store;
