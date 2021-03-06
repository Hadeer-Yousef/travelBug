import firebase from "firebase";

import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  MESSAGE_SENDER_ID,
  APP_ID,
  SOTRAGE_BUCKET,
} from "@env";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: SOTRAGE_BUCKET,
  messagingSenderId: MESSAGE_SENDER_ID,
  appId: APP_ID,
};

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export default Firebase;
