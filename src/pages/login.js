import React from "react"
import { GatsbySeo } from "gatsby-plugin-next-seo"
import { LoginFlow } from "../firebase/LoginFlow"

const LoginPage = () => (
  <>
    <GatsbySeo nofollow={true} noindex={true} title="Login | AbbyHQ" />
    <LoginFlow />
  </>
)

export default LoginPage
