import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// Configure Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyCB2NJpiOfX2BgIZUNGhZMGqFVnAlq16ik",
  authDomain: "vwlogin-5ddeb.firebaseapp.com",
  databaseURL: "https://vwlogin-5ddeb-default-rtdb.firebaseio.com/",
  projectId: "vwlogin-5ddeb",
  storageBucket: "vwlogin-5ddeb.appspot.com",
  messagingSenderId: "468280709799",
  appId: "1:468280709799:web:cb555ea0f547d759ddc182",
  measurementId: "G-ST0MGGQBQP",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)
export const auth = getAuth(app)

// const analytics = getAnalytics(app)
