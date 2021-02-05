const firebase = require("firebase/app");

require("firebase/auth");
require("firebase/database");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyA24C5GmThy132ZCykvuPPOLP9GKReEjE8",
  authDomain: "fbtestbysmm.firebaseapp.com",
  projectId: "fbtestbysmm",
  storageBucket: "fbtestbysmm.appspot.com",
  messagingSenderId: "725985318684",
  appId: "1:725985318684:web:61ac399825ac9b7da54cd9",
  measurementId: "G-8DLDBVMF86",
};

cc.Class({
  extends: cc.Component,

  properties: {},

  // onLoad () {},

  start() {
    firebase.initializeApp(firebaseConfig);

    this.sendChatMessageCloudFiresotre("CloudFiresotredummyuser", "sth1");
    this.sendChatMessageRealTime("RealTimedummyuser", "sth2");

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log("something to do after sign in");
        // User is signed in.
      } else {
        // No user is signed in.
      }
    });
  },

  // real time datebase
  sendChatMessageRealTime(username, message) {
    var postData = {
      uid: "dummyID",
      userNickName: username,
      message: message,
      time: "this is internet now",
    };

    var newPostKey = firebase.database().ref().child("PublicChat").push().key;
    var updates = {};
    updates["/PublicChat/" + newPostKey] = postData;
    console.log("completeRealtime");
    return firebase.database().ref().update(updates);
  },

  // real time cloud firestore
  sendChatMessageCloudFiresotre(username, message) {
    var postData = {
      uid: "dummyID",
      userNickName: username,
      message: message,
      time: "this is internet now",
    };

    const db = firebase.firestore();
    const docRef = db.collection("PublicChat").doc("temp");
    docRef.set(postData);
    console.log("completeFireStore");
  },

  //account creation with email pass and login/out
  onclickFirebaseCreateUser() {
    var email = "anemailishere@gmail.com";
    var password = "p@ssw0rdishere";
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log("Success account creation");
        console.log(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  },

  onclickFirebaseLoginUser() {
    var email = "anemailishere@gmail.com";
    var password = "p@ssw0rdishere";
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log("Success log in");
        console.log(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  },

  onclickFirebaseLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("log out success");
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  },
});
