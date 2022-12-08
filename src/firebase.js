import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyCpTohCDBCPdWby7G2Rh3a8NAnqjzRhMhw",
  authDomain: "star-wars-mathis.firebaseapp.com",
  projectId: "star-wars-mathis",
  storageBucket: "star-wars-mathis.appspot.com",
  messagingSenderId: "8634484183",
  appId: "1:8634484183:web:86475c8385780441287792"
});
export const database = getDatabase(firebaseApp);
export const firestore = getFirestore(firebaseApp);