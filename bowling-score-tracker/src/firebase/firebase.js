// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1KKMxTtJkhLKDnK0ikrP3d-2XP38fcEI",
  authDomain: "bowlingapp-1cdda.firebaseapp.com",
  projectId: "bowlingapp-1cdda",
  storageBucket: "bowlingapp-1cdda.appspot.com",
  messagingSenderId: "824165281228",
  appId: "1:824165281228:web:47ea46c87ae57a52f44169",
  measurementId: "G-4PJ1YKDT0Y"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const auth = firebase.auth();

export default firebase;