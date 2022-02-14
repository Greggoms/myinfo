import React, { useEffect, useState } from "react"

// Import FirebaseAuth and firebase.
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

// css
import "./firebaseUI.css"

// Configure Firebase.
const config = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
  measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
}

const firebaseApp = firebase.initializeApp(config)
const db = getFirestore(firebaseApp)

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // When Sign-in is successful, create a doc in the users collection
    // and set the doc.id equal to the user uid.
    // I'm using this approach to hopefully query for a single doc instead of 75+ each time a user goes to their profile.
    // Another side effect is the irrelevance of email matching - hooray!
    // https://github.com/firebase/firebaseui-web/issues/813
    // https://firebase.google.com/docs/firestore/manage-data/add-data
    signInSuccessWithAuthResult: async authResult => {
      const user = authResult.user
      const uid = user.uid
      const name = user.displayName
      const email = user.email
      console.log("uid: " + uid)
      const docRef = doc(db, `users/${uid}`)
      try {
        async function getUserDetails() {
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            await setDoc(doc(db, "users", uid, { merge: true }), {
              id: uid,
              name: name,
              email: email,
            })
          } else {
            await setDoc(doc(db, "users", uid), {
              id: uid,
              name: name,
              email: email,
            })
          }
        }
        getUserDetails()
      } catch (err) {
        console.log(
          "Re-running useEffect to fill a previously undefined variable"
        )
      }
      // Avoid redirects after sign-in.
      return false
    },
  },
}

export const FirebaseSignup = () => {
  const [isSignedIn, setIsSignedIn] = useState(false) // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user)
    })
    return () => unregisterAuthObserver() // Make sure we un-register Firebase observers when the component unmounts.
  }, [])

  if (!isSignedIn) {
    return (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    )
  }
  return null
}
