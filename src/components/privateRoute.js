import React, { useEffect } from "react"
import { db } from "../firebase/firebaseInit"
import { getDocs, collection, query, orderBy } from "firebase/firestore"
import { Link } from "@reach/router"
import { useSelector, useDispatch } from "react-redux/es/exports"
import { gatherUsers, selectUsers } from "../app/features/usersSlice"
import { selectUser, selectUserFireDoc } from "../app/features/userSlice"
import { Notification } from "./Notification"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const users = useSelector(selectUsers)
  const userFireDoc = useSelector(selectUserFireDoc)

  useEffect(() => {
    if (
      userFireDoc &&
      userFireDoc.role === "admin" &&
      users &&
      users.length < 1
    ) {
      async function getUsers() {
        const q = query(collection(db, "users"), orderBy("name"))
        const querySnapshot = await getDocs(q)
        console.log(
          "Gathered Assets: ",
          querySnapshot.docs.map(res => res.data())
        )
        dispatch(gatherUsers(querySnapshot.docs.map(res => res.data())))
      }
      getUsers()
    }
    // eslint is saying 'dispatch' should be included
    // in the dependency array. I say LIES!
    // eslint-disable-next-line
  }, [userFireDoc, users])

  if (!user && location.pathname !== `/app/login`) {
    return (
      <Notification lock={true}>
        You must be <Link to="/app/login">logged in</Link> to view this page.
      </Notification>
    )
  } else if (user && location.pathname === `/app/profile`) {
    return <Component {...rest} />
  }

  if (
    user &&
    userFireDoc &&
    userFireDoc.role !== "admin" &&
    location.pathname === `/app/admin`
  ) {
    return (
      <Notification lock={true}>You need Admin Rights for this.</Notification>
    )
  }
  return <Component {...rest} />
}

export default PrivateRoute
