import React, { useState, useEffect } from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { FirebaseProfile } from "../components/FirebaseProfile"
import { Notification } from "../components/Notification"
import Seo from "../components/seo"
import Svg from "../svg/lock.svg"

const ProfilePage = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    let isMounted = true
    firebase.auth().onAuthStateChanged(user => {
      if (user && isMounted) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
    return () => {
      isMounted = false
    }
  }, [user])

  if (user) {
    return <FirebaseProfile />
  } else {
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
  }
}

export default ProfilePage
