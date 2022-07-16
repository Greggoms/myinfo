import React, { useState } from "react"
import { navigate } from "@reach/router"
import { useSelector } from "react-redux/es/exports"
import { selectUserAuth } from "../../app/features/userSlice"

import useAutoFocus from "../../hooks/useAutoFocus"
import handleLogin from "../../utils/handleLogin"
import { FormContainer } from "../../css"

export const LoginForm = props => {
  const userAuth = useSelector(selectUserAuth)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  if (userAuth) {
    navigate("/app/profile")
  }

  // https://blog.logrocket.com/how-to-autofocus-using-react-hooks/
  // do this instead of <input type="email" autoFocus />
  // Create a custom hook so it can be reused.
  const emailInput = useAutoFocus()

  return (
    <FormContainer>
      <h2>Login</h2>
      <label>
        <span>Email</span>
        <input
          ref={emailInput}
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
