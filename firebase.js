import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8FEdVSvU7BJX_rXqtGlkGIEnYW1l0So8",
  authDomain: "todo-next-bb6b2.firebaseapp.com",
  projectId: "todo-next-bb6b2",
  storageBucket: "todo-next-bb6b2.appspot.com",
  messagingSenderId: "104987929433",
  appId: "1:104987929433:web:90bc5ec416fdae6aa47a48",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
