import React from "react"
import { auth } from "../firebase/firebaseInit"
import { signOut } from "firebase/auth"
import { Link, navigate } from "gatsby"
import { useSelector, useDispatch } from "react-redux"
import {
  logout,
  selectUser,
  selectUserFireDoc,
  userFireDoc,
} from "../app/features/userSlice"
import { gatherUsers } from "../app/features/usersSlice"

import { toastifyFailed, toastifyInfo } from "./toasts"
import { NavContainer } from "../css"

export const Nav = () => {
  const userDoc = useSelector(selectUserFireDoc)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  return (
    <NavContainer>
      <Link
        to="/profile"
        activeStyle={{ color: "#94BDF2", textDecoration: "none" }}
      >
        Profile
      </Link>
      <Link
        to="/faq"
        activeStyle={{ color: "#94BDF2", textDecoration: "none" }}
      >
        FAQ
      </Link>

      {userDoc && userDoc.role === "admin" && (
        <Link
          to="/dashboard"
          activeStyle={{ color: "#94BDF2", textDecoration: "none" }}
        >
          Admin
        </Link>
      )}

      {user ? (
        <button
          type="button"
          onClick={() => {
            signOut(auth)
              .then(() => {
                // set user to null in redux state
                dispatch(logout())
                dispatch(userFireDoc(null))
                dispatch(gatherUsers(null))
                navigate("/")
                toastifyInfo(`Successful Logout!`)
              })
              .catch(error => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorCode, "=>", errorMessage)
                toastifyFailed(errorMessage)
              })
          }}
        >
          Logout
        </button>
      ) : (
        <Link to="/login" activeStyle={{ color: "#94BDF2" }}>
          Login/Register
        </Link>
      )}
    </NavContainer>
  )
}
