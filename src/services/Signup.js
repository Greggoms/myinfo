import React, { useEffect } from "react"
import { navigate } from "@reach/router"
const netlifyIdentity = require("netlify-identity-widget")

export const Signup = () => {
  useEffect(() => {
    netlifyIdentity.init()
    netlifyIdentity.store.user &&
      netlifyIdentity.refresh().then(jwt => console.log(jwt))
    console.log(netlifyIdentity)
  }, [])

  useEffect(() => {
    netlifyIdentity.on("login", user => navigate("/"))
    netlifyIdentity.on("logout", user => navigate("/"))
  }, [])
  const Logout = () => {
    netlifyIdentity.open()
    console.log("Logged out")
  }
  return (
    <>
      {netlifyIdentity.store.user ? (
        <button onClick={Logout}>Logout</button>
      ) : (
        <>
          <button onClick={() => netlifyIdentity.open("login")}>Login</button>
          <button onClick={() => netlifyIdentity.open("signup")}>Signup</button>
        </>
      )}
    </>
  )
}
