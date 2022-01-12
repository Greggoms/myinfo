import React, { useEffect, useState } from "react"
import { navigate } from "@reach/router"
import { LogContainer, ModalButtonContainer } from "../elements"
const netlifyIdentity = require("netlify-identity-widget")

export const Signup = () => {
  const user = netlifyIdentity.currentUser()
  const [isLoggedIn, setIsLoggedIn] = useState(
    user !== null && user.token !== null ? true : false
  )

  const handleModalClose = () => {
    setTimeout(() => {
      netlifyIdentity.close()
    }, 0)
  }

  useEffect(() => {
    netlifyIdentity.on("login", () => {
      setIsLoggedIn(true)
      navigate("/app/profile")
      handleModalClose()
    })
  }, [])
  useEffect(() => {
    netlifyIdentity.on("logout", () => {
      setIsLoggedIn(false)
      navigate("/")
    })
  }, [])

  const Logout = () => {
    netlifyIdentity.logout()
  }

  return (
    <LogContainer>
      {isLoggedIn ? (
        <ModalButtonContainer>
          <span>Welcome {user.user_metadata.full_name},</span>
          <button onClick={Logout}>Logout</button>
        </ModalButtonContainer>
      ) : (
        <ModalButtonContainer>
          <button onClick={() => netlifyIdentity.open("login")}>Login</button>
          <button onClick={() => netlifyIdentity.open("signup")}>Signup</button>
        </ModalButtonContainer>
      )}
    </LogContainer>
  )
}
