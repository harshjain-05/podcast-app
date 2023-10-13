
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDJnyqZBj7dRPCUPk_Xy0O85uSuG3gNAgs",
  authDomain: "react-podcast-app-185e8.firebaseapp.com",
  projectId: "react-podcast-app-185e8",
  storageBucket: "react-podcast-app-185e8.appspot.com",
  messagingSenderId: "119960864501",
  appId: "1:119960864501:web:96a2af9b535aa4b1ca67bc",
  measurementId: "G-F20XQDH3CE"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth , db , storage}
