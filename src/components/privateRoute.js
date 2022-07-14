import React from "react"
import { useSelector } from "react-redux/es/exports"
import { selectUser } from "../app/features/userSlice"
import { navigate } from "@reach/router"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const currentUser = useSelector(selectUser)

  if (!currentUser && location.pathname !== `/login`) {
    console.log(`You must be logged in to navigate to ${location.pathname}`)
    navigate("/login")
    return null
  }

  return !currentUser ? (
    // If we’re not logged in, redirect to the login page.
    navigate(`/login`)
  ) : (
    <Component {...rest} />
  )
}

export default PrivateRoute
