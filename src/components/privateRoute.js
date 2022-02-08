import React, { useState, useEffect } from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { Notification } from "./Notification"
import Seo from "./seo"
import Svg from "../svg/lock.svg"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const [user, setUser] = useState([])

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      }
    })
  }, [user])

  if (!user && location.pathname === `/app/profile`) {
    return (
      <>
        <Seo title="Profile" />
        <Notification message="You must be logged in to view your profile." />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Svg
            style={{
              width: "100%",
              maxWidth: "25rem",
              height: "100%",
              opacity: 0.5,
            }}
          />
        </div>
      </>
    )
  } else if (!user && location.pathname === `/app/dashboard`) {
    return (
      <>
        <Seo title="Dashboard" />
        <Notification message="You must be logged in to see the dashboard." />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Svg
            style={{
              width: "100%",
              maxWidth: "25rem",
              height: "100%",
              opacity: 0.5,
            }}
          />
        </div>
      </>
    )
  }
  return <Component {...rest} />
}
export default PrivateRoute
