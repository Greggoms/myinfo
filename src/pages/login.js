import React, { useEffect } from "react"
import { GatsbySeo } from "gatsby-plugin-next-seo"
import { LoginFlow } from "../firebase/LoginFlow"

const LoginPage = () => {
  useEffect(() => {
    if (window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }, [])

  return (
    <>
      <GatsbySeo nofollow={true} noindex={true} title="Login | AbbyHQ" />
      <LoginFlow />
    </>
  )
}

export default LoginPage
