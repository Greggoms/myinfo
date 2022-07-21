import React from "react"
import { auth } from "../services/firebaseInit"
import { signOut } from "firebase/auth"
import { Link, navigate } from "gatsby"
import { useSelector, useDispatch } from "react-redux"
import {
  logout,
  selectUserAuth,
  selectUserFireDoc,
  userFireDoc,
} from "../app/features/userSlice"
import { gatherUsers } from "../app/features/usersSlice"
import { toast } from "react-toastify"
import { NavContainer } from "../css"
import theme from "../theme"

export const Nav = props => {
  const dispatch = useDispatch()
  const user = useSelector(selectUserAuth)
  const userDoc = useSelector(selectUserFireDoc)

  return (
    <NavContainer style={props.style}>
      <Link
        to="/app/profile"
        activeStyle={{
          color: props.mobile ? theme.colors.linkDark : theme.colors.linkLight,
          textDecoration: "none",
        }}
        onClick={props.closeNav}
      >
        Profile
      </Link>
      <Link
        to="/documents"
        activeStyle={{
          color: props.mobile ? theme.colors.linkDark : theme.colors.linkLight,
          textDecoration: "none",
        }}
        onClick={props.closeNav}
      >
        Documents
      </Link>
      <Link
        to="/faq"
        activeStyle={{
          color: props.mobile ? theme.colors.linkDark : theme.colors.linkLight,
          textDecoration: "none",
        }}
        onClick={props.closeNav}
      >
        FAQ
      </Link>

      {userDoc && userDoc.role === "admin" && (
        <Link
          to="/app/admin"
          activeStyle={{
            color: props.mobile
              ? theme.colors.linkDark
              : theme.colors.linkLight,
            textDecoration: "none",
          }}
          onClick={props.closeNav}
        >
          Admin
        </Link>
      )}

      {user ? (
        <button
          type="button"
          onClick={() => {
            props.closeNav()
            signOut(auth)
              .then(() => {
                navigate("/")
                // set user to null in redux state
                dispatch(logout())
                dispatch(userFireDoc(null))
                dispatch(gatherUsers([]))
                toast.info(`Successful Logout!`, {
                  autoClose: 1000,
                })
              })
              .catch(error => {
                console.log(error.code, "=>", error.message)
                toast.error(error.message)
              })
          }}
        >
          Logout
        </button>
      ) : (
        <Link
          to="/app/login"
          activeStyle={{
            color: props.mobile
              ? theme.colors.linkDark
              : theme.colors.linkLight,
          }}
          onClick={props.closeNav}
        >
          Login/Register
        </Link>
      )}
    </NavContainer>
  )
}
