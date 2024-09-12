// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuR2CO2Yq4hNMBZA0kzLbajPp0ho6LuPo",
  authDomain: "login-application-b9373.firebaseapp.com",
  projectId: "login-application-b9373",
  storageBucket: "login-application-b9373.appspot.com",
  messagingSenderId: "575614136408",
  appId: "1:575614136408:web:29e838b31d634216c15a2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export default app;



// this firebase.js is responsible to connect firebase with reactjs project.