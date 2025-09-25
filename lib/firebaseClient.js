// Firebase client initialization
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCnzXi1tVu3fWvuPMffaepqT74DXEb8wWk",
  authDomain: "codeskytz-portifolio.firebaseapp.com",
  projectId: "codeskytz-portifolio",
  storageBucket: "codeskytz-portifolio.firebasestorage.app",
  messagingSenderId: "658801980297",
  appId: "1:658801980297:web:3df9f01e5641120d81e758",
  measurementId: "G-0RHE2PZ3FL"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage, collection, addDoc, serverTimestamp, ref, uploadString, getDownloadURL }
