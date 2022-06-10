import React, { useState } from "react"
import { auth } from "./firebaseInit"
import { sendPasswordResetEmail } from "firebase/auth"
import { toastifyPasswordReset, toastifyFailed } from "../components/toasts"
import { FormContainer } from "../css"

export const PasswordResetForm = () => {
  const [email, setEmail] = useState("")

  const handlePasswordReset = e => {
    e.preventDefault()

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        console.log("Password Reset Link Sent", "=>", email)
        toastifyPasswordReset(email)
        setEmail("")
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, "=>", errorMessage)
        if (errorCode === "auth/missing-email") {
          toastifyFailed(
            "Please fill in your email before sending the reset link."
          )
        }
      })
  }

  return (
    <FormContainer>
      <h3>Forgot password? Reset it here.</h3>
      <label>
        <span>Email</span>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          placeholder="your@email.com"
        />
      </label>
      <button onClick={handlePasswordReset} type="submit">
        Send reset link
      </button>
    </FormContainer>
  )
}
