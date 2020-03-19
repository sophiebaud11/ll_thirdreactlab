import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHkR49UoZeDftQKT42WDm7ObPnZTqBC3E",
  authDomain: "ll-react-sophie.firebaseapp.com",
  databaseURL: "https://ll-react-sophie.firebaseio.com",
  projectId: "ll-react-sophie",
  storageBucket: "ll-react-sophie.appspot.com",
  messagingSenderId: "510518157327",
  appId: "1:510518157327:web:5e42f71a45608c3708c37a",
  measurementId: "G-MRE4THL8J9"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const authenticateAnonymously = () => {
    return firebase.auth().signInAnonymously();
};
export const createData = (userName, userId) => {
    return db.collection('test')
        .add({
            created: firebase.firestore.FieldValue.serverTimestamp(),
        });
};
