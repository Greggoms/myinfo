import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { Nav } from "./Nav"
// import { AdvancedNav } from "./AdvancedNav"
// import { AdminNav } from "./AdminNav"
// import { NormalNav } from "./NormalNav"
import { Signup } from "../services/Signup"
import { HeaderContainer, HeaderContents } from "../elements"
const netlifyIdentity = require("netlify-identity-widget")

export const Header = ({ siteTitle }) => {
  const user = netlifyIdentity.currentUser()

  const [email, setEmail] = useState(user ? user.email : "")
  useEffect(() => {
    // eslint-disable-next-line
    if (email == "rpggamer1337man@gmail.com") {
      setEmail("rpggamer1337man@gmail.com")
      console.log(email)
      // eslint-disable-next-line
    } else {
      setEmail("")
    }
  }, [email])

  return (
    <HeaderContainer>
      <HeaderContents>
        <h1>
          <Link to="/">{siteTitle}</Link>
        </h1>
        <Signup />
        <div className="navigation">
          <Nav />
          {/* {user && email === "rpggamer1337man@gmail.com" ? (
            <AdminNav />
          ) : (
            <NormalNav />
          )} */}
        </div>
      </HeaderContents>
    </HeaderContainer>
  )
}
