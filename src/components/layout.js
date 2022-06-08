import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { auth, db } from "../firebase/firebaseInit"
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy,
} from "firebase/firestore"
import { login, userFireDoc } from "../app/features/userSlice"
import { gatherUsers } from "../app/features/usersSlice"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { LayoutContainer, MainContainer } from "../css"
import "./layout.css"

const Layout = ({ children }) => {
  const dispatch = useDispatch()

  // This useEffect persists user session through hard refreshes
  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        console.log("Page refreshed. Fetching user...")
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
        async function getUsers() {
          console.log("Calling firebase...")
          const q = query(collection(db, "users"), orderBy("name"))
          const querySnapshot = await getDocs(q)
          gatherUsers(querySnapshot.docs.map(res => res.data()))
          dispatch(gatherUsers(querySnapshot.docs.map(res => res.data())))
        }
        grabUserDoc()
        getUsers()
      } else {
        console.log("No logged in user detected.")
      }
    })
    // not sure if dispatch dependency is actually needed..
  }, [dispatch])

  return (
    <LayoutContainer>
      <Header siteTitle="AbbyHQ" />
      <div className="content">
        <MainContainer>{children}</MainContainer>
      </div>
      <Footer />
    </LayoutContainer>
  )
}

export default Layout
