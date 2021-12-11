import React, { useEffect, useState } from "react"
import { navigate } from "@reach/router"
import styled from "styled-components"
const netlifyIdentity = require("netlify-identity-widget")

export const Signup = () => {
  const user = netlifyIdentity.currentUser()
  const [isLoggedIn, setIsLoggedIn] = useState(
    user !== null && user.token !== null ? true : false
  )

  useEffect(() => {
    netlifyIdentity.on("login", user => {
      setIsLoggedIn(true)
      navigate("/app/profile")
      console.log(user)
    })
    netlifyIdentity.on("logout", () => {
      setIsLoggedIn(false)
      navigate("/")
    })
  }, [])
  const Logout = () => {
    netlifyIdentity.logout()
    console.log(user)
  }
  return (
    <LogContainer>
      {isLoggedIn ? (
        <>
          <span>Welcome {user.user_metadata.full_name},</span>
          <button onClick={Logout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={() => netlifyIdentity.open("login")}>Login</button>
          <button onClick={() => netlifyIdentity.open("signup")}>Signup</button>
        </>
      )}
    </LogContainer>
  )
}

const LogContainer = styled.div`
  display: flex;
  margin-right: 2rem;

  button:first-child {
    margin-right: 1rem;
  }

  button {
    background: none;
    border: none;
    color: ${props => props.theme.cubePalette.light};
    cursor: pointer;
    text-decoration: underline;
  }

  span {
    color: ${props => props.theme.cubePalette.light};
    margin-right: 0.5rem;
    font-size: 12pt;
  }
`
