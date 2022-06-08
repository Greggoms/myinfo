import React, { useState } from "react"
import { auth, db } from "./firebaseInit"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import format from "date-fns/format"
import { toastifyAccountCreation, toastifyFailed } from "../components/toasts"
import { FormContainer } from "../css"
import { navigate } from "gatsby"

export const RegisterForm = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const timestamp = format(new Date(), "PPPPpp")

  const handleUserDocCreation = () => {
    const uid = auth.currentUser.uid
    try {
      async function createUserDoc() {
        await setDoc(doc(db, "users", uid), {
          id: uid,
          name: name,
          email: auth.currentUser.email,
          role: "default",
          timestamp: timestamp,
        })
      }
      createUserDoc()
      console.log("User Doc added!", name, "=>", auth.currentUser.uid)
    } catch (err) {
      console.log(err)
    }
  }

  const handleRegister = e => {
    e.preventDefault()

    if (!name) {
      return toastifyFailed("Please fill in your name for your new account.")
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        updateProfile(auth.currentUser, {
          displayName: name,
        })
        toastifyAccountCreation(email)
        handleUserDocCreation()
      })
      .then(() => {
        navigate("/profile")
        setName("")
        setEmail("")
        setPassword("")
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, "=>", errorMessage)
        if (errorCode === "auth/email-already-in-use") {
          toastifyFailed(
            "Cannot create new account! This email is already in use. Try logging in instead."
          )
        } else if (errorCode === "auth/weak-password") {
          toastifyFailed("Password should be at least 6 characters")
        } else {
          toastifyFailed(errorMessage)
        }
      })
  }

  return (
    <FormContainer>
      <h3>For new users</h3>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        type="text"
        placeholder="Full Name"
      />
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <div className="login-buttons">
        <button className="register" onClick={handleRegister} type="submit">
          Register
        </button>
      </div>
    </FormContainer>
  )
}
