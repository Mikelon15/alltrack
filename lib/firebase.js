// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNpuz_6gwYLiPOByYeuko_sPPyugUNx6M",
  authDomain: "alltrak-681dd.firebaseapp.com",
  projectId: "alltrak-681dd",
  storageBucket: "alltrak-681dd.appspot.com",
  messagingSenderId: "247810383001",
  appId: "1:247810383001:web:2c26bdb38dfeb19712ec08",
  measurementId: "G-DHTT10ZZK7"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

