import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3OCZT9QKhWU3cCapxQlOcu_cle7t6lmc",
  authDomain: "ridbuter.firebaseapp.com",
  projectId: "ridbuter",
  storageBucket: "ridbuter.appspot.com",
  messagingSenderId: "587151532996",
  appId: "1:587151532996:web:e30af8c97ee4198e89ba91"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const firestore = getFirestore(app);

export { authentication, firestore };