import React, { useState } from "react"
import { auth } from "./firebaseInit"
import { sendPasswordResetEmail } from "firebase/auth"
import { toast } from "react-toastify"
import { FormContainer } from "../css"

export const PasswordResetForm = props => {
  const [email, setEmail] = useState("")

  const handlePasswordReset = e => {
    e.preventDefault()

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        console.log("Password Reset Link Sent", "=>", email)
        toast.info(
          `Password reset link sent to ${email}. Check your spam folder!`
        )
        setEmail("")
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, "=>", errorMessage)
        if (errorCode === "auth/missing-email") {
          toast.error(
            "Please fill in your email before sending the reset link."
          )
        }
      })
  }

  return (
    <FormContainer>
      <h2>Password Reset</h2>
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
      <p>
        Email will be sent from: <br /> noreply@vwlogin-5ddeb.firebase.app
      </p>
      <p>Be sure to check your spam folder!</p>

      <hr />

      <div className="form-nav">
        <div className="label">
          Have an account?
          <button name="login" onClick={props.handleFormNavigation}>
            Sign in
          </button>
        </div>
        <div className="label">
          Need an account?
          <button name="register" onClick={props.handleFormNavigation}>
            Register
          </button>
        </div>
      </div>
    </FormContainer>
  )
}
