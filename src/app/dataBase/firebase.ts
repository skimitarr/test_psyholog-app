import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtNIJ_SF4liJc8PM-_EFt9hq4WGkqSe08",
  authDomain: "psy-app-2050f.firebaseapp.com",
  projectId: "psy-app-2050f",
  storageBucket: "psy-app-2050f.appspot.com",
  messagingSenderId: "730521229122",
  appId: "1:730521229122:web:a00c6048f3a0b892a79adb",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
