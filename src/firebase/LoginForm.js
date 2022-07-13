import React, { useState } from "react"
import { navigate } from "gatsby"
import { auth } from "./firebaseInit"
import { signInWithEmailAndPassword } from "firebase/auth"
import { toast } from "react-toastify"
import { FormContainer } from "../css"

export const LoginForm = props => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = e => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
      .then(userAuth => {
        const user = userAuth.user
        toast(`Welcome ${user.displayName}!`)
        setEmail("")
        setPassword("")
        navigate("/app/profile")
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, "=>", errorMessage)
        if (errorCode === "auth/user-not-found") {
          toast.error("No account detected! Try registering instead.")
        } else if (errorCode === "auth/invalid-email") {
          toast.error("Please use a valid email format.")
        } else {
          toast.error(errorMessage)
        }
      })
  }

  return (
    <FormContainer>
      <h2>Login</h2>
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
        <span>Password</span>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </label>
      <button className="login" onClick={handleLogin} type="submit">
        Login
      </button>
      <p>
        Need an account?{" "}
        <button
          name="register"
          onClick={props.handleFormNavigation}
          className="form-nav"
        >
          Register
        </button>
      </p>
      <p>
        Forgot Password?{" "}
        <button
          name="passwordreset"
          onClick={props.handleFormNavigation}
          className="form-nav"
        >
          Reset it
        </button>
      </p>
    </FormContainer>
  )
}
