import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  // const user = netlifyIdentity.currentUser()
  // console.log(user)
  let user
  if (!user && location.pathname !== `/app/profile`) {
    navigate("/")
    return null
  }
  return <Component {...rest} />
}
export default PrivateRoute
