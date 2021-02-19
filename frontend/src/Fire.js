import firebase from "firebase";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyCjYwVQi6fcraNbfaLTvLKtA5QFikDZqYc",
    authDomain: "cta-reddit.firebaseapp.com",
    projectId: "cta-reddit",
    storageBucket: "cta-reddit.appspot.com",
    messagingSenderId: "421801727139",
    appId: "1:421801727139:web:abf9eeeca88b53ee6a5b16",
    measurementId: "G-E4TVSH9EGV"
  };
  
  const fire = firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  firebase.analytics();

  export { storage, fire as default };