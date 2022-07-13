import React, { useState } from "react"
import { navigate } from "gatsby"
import { auth, db } from "./firebaseInit"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import format from "date-fns/format"
import { toast } from "react-toastify"
import { FormContainer } from "../css"

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
      return toast.error("Please fill in your name for your new account.")
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        updateProfile(auth.currentUser, {
          displayName: name,
        })
        handleUserDocCreation()
        toast.success(`Account Created for ${name}! - ${email}`)
      })
      .then(() => {
        navigate("/app/profile")
        setName("")
        setEmail("")
        setPassword("")
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, "=>", errorMessage)
        if (errorCode === "auth/email-already-in-use") {
          toast.error(
            "Cannot create new account! This email is already in use. Try logging in instead."
          )
        } else if (errorCode === "auth/weak-password") {
          toast.error("Password should be at least 6 characters")
        } else {
          toast.error(errorMessage)
        }
      })
  }

  return (
    <FormContainer>
      <h3>For new users</h3>
      <label>
        <span>First and Last Name</span>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          type="text"
          placeholder="Bruce Wayne"
        />
      </label>
      <label>
        <span>Email</span>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          placeholder="your@email.com"
        />
      </label>
      <label>
        <span>Set Password</span>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </label>
      <button className="register" onClick={handleRegister} type="submit">
        Register
      </button>
    </FormContainer>
  )
}
