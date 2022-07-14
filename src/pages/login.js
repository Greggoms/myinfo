import React, { useState } from "react"
import { LoginForm } from "../firebase/LoginForm"
import { PasswordResetForm } from "../firebase/PasswordResetForm"
import { RegisterForm } from "../firebase/RegisterForm"
import { LoginPageWrapper } from "../css"
import { GatsbySeo } from "gatsby-plugin-next-seo"

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
      {loginForm && (
        <>
          <GatsbySeo nofollow={true} noindex={true} title={`Login | AbbyHQ`} />
          <LoginForm handleFormNavigation={handleFormNavigation} />
        </>
      )}

      {registerForm && (
        <>
          <GatsbySeo
            nofollow={true}
            noindex={true}
            title={`Register | AbbyHQ`}
          />
          <RegisterForm handleFormNavigation={handleFormNavigation} />
        </>
      )}
      {passwordResetForm && (
        <>
          <GatsbySeo
            nofollow={true}
            noindex={true}
            title={`Reset Password | AbbyHQ`}
          />
          <PasswordResetForm handleFormNavigation={handleFormNavigation} />
        </>
      )}
    </LoginPageWrapper>
  )
}

export default LoginFlow
