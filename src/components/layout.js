import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { auth, db } from "../firebase/firebaseInit"
import { doc, getDoc } from "firebase/firestore"
import { login, userFireDoc } from "../app/features/userSlice"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { LayoutContainer, MainContainer } from "../css"

const Layout = ({ children }) => {
  const dispatch = useDispatch()

  // This useEffect persists user session through hard refreshes
  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      console.log("Page refreshed. Fetching user...")
      if (userAuth) {
        dispatch(
          login({
            id: userAuth.uid,
            name: userAuth.displayName,
            email: userAuth.email,
          })
        )
        const docRef = doc(db, "users", userAuth.uid)
        async function grabUserDoc() {
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            dispatch(userFireDoc(docSnap.data()))
          }
        }
        grabUserDoc()
      } else {
        console.log("No logged in user detected.")
      }
    })
    // eslint-disable-next-line
  }, [])

  return (
    <HelmetProvider>
      <LayoutContainer>
        <Helmet>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Raleway:200,400,700&display=swap"
          />
        </Helmet>
        <Header siteTitle="AbbyHQ" />
        <div className="content">
          <MainContainer>{children}</MainContainer>
        </div>
        <Footer />
      </LayoutContainer>
    </HelmetProvider>
  )
}

export default Layout
