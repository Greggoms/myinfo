import React, { useState, useEffect } from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { Link, navigate } from "gatsby"
import { NormalNav } from "../components/NormalNav"
import { AdminNav } from "../components/AdminNav"
import { HeaderContainer, HeaderContents } from "../elements"

export const Header = ({ siteTitle }) => {
  const [user, setUser] = useState([])

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user)
    })
  }, [user])

  if (!user) {
    return (
      <HeaderContainer>
        <HeaderContents>
          <h1>
            <Link to="/">{siteTitle}</Link>
          </h1>
          <p style={{ color: "#f9f9f9", display: "flex" }}>Please sign in</p>

          <div className="navigation">
            <NormalNav />
          </div>
        </HeaderContents>
      </HeaderContainer>
    )
  } else {
    return (
      <HeaderContainer>
        <HeaderContents>
          <h1>
            <Link to="/">{siteTitle}</Link>
          </h1>
          <div className="login-status">
            <p>Welcome {user.displayName}, </p>
            <button
              onClick={() =>
                firebase
                  .auth()
                  .signOut()
                  .then(() => navigate(`/`))
              }
            >
              Logout
            </button>
          </div>
          <div className="navigation">
            <AdminNav />
          </div>
        </HeaderContents>
      </HeaderContainer>
    )
  }
}
