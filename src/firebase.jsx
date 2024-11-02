import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyALx4LisSyTdc0e6gd5PwGPHkmMZ7WUFsA",
  authDomain: "datatracking-bc995.firebaseapp.com",
  projectId: "datatracking-bc995",
  storageBucket: "datatracking-bc995.appspot.com",
  messagingSenderId: "6074247590",
  appId: "1:6074247590:web:f090c436e1e236f1678767",
  measurementId: "G-HYWPPC48NV"
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth, storage };