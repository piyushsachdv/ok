import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqkICFQwiCMoxYLWfsuc85YebSGq3TEes",
  authDomain: "login-page-bb5c3.firebaseapp.com",
  projectId: "login-page-bb5c3",
  storageBucket: "login-page-bb5c3.appspot.com", // <-- FIXED HERE
  messagingSenderId: "753347360230",
  appId: "1:753347360230:web:290f5a34a245084140d227",
  measurementId: "G-HGHDGXZ2Z9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };