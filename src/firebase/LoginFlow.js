import React, { useState } from "react"
import { LoginForm } from "./LoginForm"
import { PasswordResetForm } from "./PasswordResetForm"
import { RegisterForm } from "./RegisterForm"
import { LoginPageWrapper } from "../css"

export const LoginFlow = () => {
  const [loginForm, setLoginForm] = useState(true)
  const [registerForm, setRegisterForm] = useState(false)
  const [passwordResetForm, setPasswordResetForm] = useState(false)

  const buttonStyles = {
    active: {
      background: "#333",
      color: "#f9f9f9",
      transform: "translateY(-20px)",
      borderTopLeftRadius: "10px",
      borderTopRightRadius: "10px",
    },
    inactive: {
      background: "#ccc",
      color: "#333",
      transform: "translateY(0)",
    },
  }

  return (
    <LoginPageWrapper>
      <div className="login-flow-content">
        <div className="form-select-buttons">
          <button
            onClick={() => {
              setRegisterForm(false)
              setPasswordResetForm(false)
              setLoginForm(true)
            }}
            type="button"
            style={loginForm ? buttonStyles.active : buttonStyles.inactive}
          >
            Log in
          </button>
          <button
            onClick={() => {
              setLoginForm(false)
              setPasswordResetForm(false)
              setRegisterForm(true)
            }}
            type="button"
            style={registerForm ? buttonStyles.active : buttonStyles.inactive}
            className="register"
          >
            Register
          </button>
          <button
            onClick={() => {
              setLoginForm(false)
              setRegisterForm(false)
              setPasswordResetForm(true)
            }}
            type="button"
            style={
              passwordResetForm ? buttonStyles.active : buttonStyles.inactive
            }
          >
            Reset Password
          </button>
        </div>
        {loginForm && <LoginForm />}
        {registerForm && <RegisterForm />}
        {passwordResetForm && <PasswordResetForm />}
      </div>
    </LoginPageWrapper>
  )
}
