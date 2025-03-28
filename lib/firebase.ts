import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.API_KEY_FIREBASE,
  authDomain: process.env.AUTH_DOMAIN_FIREBASE,
  projectId: process.env.PROJECT_ID_FIREBASE,
  storageBucket: process.env.STORAGE_BUCKET_FIREBASE,
  messagingSenderId: process.env.MESSAGING_SENDER_ID_FIREBASE,
  appId: process.env.APP_ID_FIREBASE
};

console.log(firebaseConfig)
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

