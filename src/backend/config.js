import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_I9Pk1hKu8x-eZGMkfAgp6F5dRfvMHU0",
  authDomain: "voicenotes-82070.firebaseapp.com",
  databaseURL:
    "https://voicenotes-82070-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "voicenotes-82070",
  storageBucket: "voicenotes-82070.firebasestorage.app",
  messagingSenderId: "626240339689",
  appId: "1:626240339689:web:2d1a2f1c6b230d6366fa78",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getDatabase(app);

export const storage = getStorage(app);
export const firestore = getFirestore(app);
