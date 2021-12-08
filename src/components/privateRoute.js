import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
const netlifyIdentity = require("netlify-identity-widget")

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const [JWT, setJWT] = useState("")
  const user = netlifyIdentity.store.user
  useEffect(() => {
    user !== null &&
      netlifyIdentity.refresh().then(jwt => {
        setJWT(jwt)
        console.log(`Authenticated: ${jwt}`)
      })
    if (user === null) {
      console.log("No Token. Unauthenticated")
      navigate("/")
    }
  }, [])

  if ((JWT === "" || JWT === null) && location.pathname === `/app/profile`) {
    console.log("Tried opening locked path")
    // navigate("/")
    return null
  }
  return <Component {...rest} />
}
export default PrivateRoute
