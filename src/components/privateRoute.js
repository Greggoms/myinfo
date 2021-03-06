import React from "react"
import { useSelector } from "react-redux/es/exports"
import { selectUserAuth } from "../app/features/userSlice"
import { navigate } from "@reach/router"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const currentUser = useSelector(selectUserAuth)

  if (!currentUser && location.pathname !== "/app/login") {
    console.log(
      location.pathname === "/app/profile"
        ? `You must login first!`
        : `Access Denied`
    )
    navigate("/app/login")
    return null
  }

  // return !currentUser ? (
  //   // If we’re not logged in, redirect to the login page.
  //   navigate("/app/login")
  // ) : (
  return <Component {...rest} />
  // )
}

export default PrivateRoute
