import React, { useState } from "react"
import { useSelector } from "react-redux/es/exports"
import { selectUserFireDoc } from "../app/features/userSlice"
import handleLogin from "../utils/handleLogin"
import { navigate } from "@reach/router"
import { FormContainer } from "../css"

export const LoginForm = props => {
  const currentUserFireDoc = useSelector(selectUserFireDoc)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  if (currentUserFireDoc) {
    navigate(`/app/profile`)
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
      <button
        className="login"
        onClick={e => handleLogin(e, { email: email, password: password })}
        type="submit"
      >
        Login
      </button>

      <hr />

      <div className="form-nav">
        <div className="label">
          Need an account?{" "}
          <button name="register" onClick={props.handleFormNavigation}>
            Register
          </button>
        </div>
        <div className="label">
          Forgot Password?{" "}
          <button name="passwordreset" onClick={props.handleFormNavigation}>
            Reset it
          </button>
        </div>
      </div>
    </FormContainer>
  )
}
