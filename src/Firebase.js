// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjK1CBH-CVg504bEgB8kDv_cKI7C4Pqsg",
  authDomain: "vueauth-5ef08.firebaseapp.com",
  projectId: "vueauth-5ef08",
  storageBucket: "vueauth-5ef08.appspot.com",
  messagingSenderId: "534922482098",
  appId: "1:534922482098:web:2d155d1c96c5bfdabe14ab",
  measurementId: "G-W69J84SSHK",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const userCollection = db.collection("users");
const postsCollection = db.collection("posts");

export { db, auth, userCollection, postsCollection };

export default firebase;
