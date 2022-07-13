import React, { useState } from "react"
import { LoginForm } from "./LoginForm"
import { PasswordResetForm } from "./PasswordResetForm"
import { RegisterForm } from "./RegisterForm"
import { LoginPageWrapper } from "../css"

const LoginFlow = () => {
  const [loginForm, setLoginForm] = useState(true)
  const [registerForm, setRegisterForm] = useState(false)
  const [passwordResetForm, setPasswordResetForm] = useState(false)

  const handleFormNavigation = e => {
    e.preventDefault()
    try {
      if (e.target.name === "login") {
        setRegisterForm(false)
        setPasswordResetForm(false)
        setLoginForm(true)
      } else if (e.target.name === "register") {
        setLoginForm(false)
        setPasswordResetForm(false)
        setRegisterForm(true)
      } else if (e.target.name === "passwordreset") {
        setLoginForm(false)
        setRegisterForm(false)
        setPasswordResetForm(true)
      }
    } catch (e) {
      console.error(e.message)
    }
  }

  return (
    <LoginPageWrapper>
      {loginForm && <LoginForm handleFormNavigation={handleFormNavigation} />}
      {registerForm && (
        <RegisterForm handleFormNavigation={handleFormNavigation} />
      )}
      {passwordResetForm && (
        <PasswordResetForm handleFormNavigation={handleFormNavigation} />
      )}
    </LoginPageWrapper>
  )
}

export default LoginFlow
