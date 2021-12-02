import React, { useEffect } from "react"
const netlifyIdentity = require("netlify-identity-widget")

export const Signup = () => {
  useEffect(() => {
    netlifyIdentity.init()
    netlifyIdentity.store.user &&
      netlifyIdentity.refresh().then(jwt => console.log(jwt))
    console.log(netlifyIdentity)
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
