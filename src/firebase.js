import firebase from 'firebase'
import 'firebase/firebase-auth'
 // Your web app's Firebase configuration
  var config = {
    apiKey: "AIzaSyB_gWvBtb3o_ys2gvIPG5aq8vWp9EAzNAc",
    authDomain: "vue-firebase-admin.firebaseapp.com",
    databaseURL: "https://vue-firebase-admin.firebaseio.com",
    projectId: "vue-firebase-admin",
    storageBucket: "vue-firebase-admin.appspot.com",
    messagingSenderId: "975026859219",
    appId: "1:975026859219:web:e17877a02f199d8534b826",
    measurementId: "G-0WQ4C1VKVN"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(config);
  const db = firebase.firestore();

  export {fb,db}