import React, { useState, useEffect } from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getFirestore, doc, getDoc } from "firebase/firestore"
import { Link, navigate } from "gatsby"
import { NormalNav } from "../components/NormalNav"
import { AdminNav } from "../components/AdminNav"
import { HeaderContainer, HeaderContents } from "../elements"

export const Header = ({ siteTitle }) => {
  const [user, setUser] = useState([])
  const [uid, setUid] = useState("")
  const [details, setDetails] = useState([])
  const db = getFirestore()

  useEffect(() => {
    let isMounted = true
    firebase.auth().onAuthStateChanged(user => {
      if (user && isMounted) {
        setUser(user)
        setUid(user.uid)
      } else {
        setUser(null)
        setUid(null)
      }
    })
    return () => {
      isMounted = false
    }
  }, [user])

  useEffect(() => {
    try {
      const docRef = doc(db, `users/${uid}`)
      async function getUserDetails() {
        const docSnap = await getDoc(docRef)
        if (docSnap.data() === undefined) {
          setDetails([])
        } else {
          setDetails(docSnap.data())
        }
      }
      getUserDetails()
    } catch {
      console.log(
        "Re-running useEffect to fill a previously undefined variable"
      )
    }
    // eslint-disable-next-line
  }, [uid])

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
            {details.role === "admin" ? <AdminNav /> : <NormalNav />}
          </div>
        </HeaderContents>
      </HeaderContainer>
    )
  }
}
