import React from "react"
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseInit"

import { useSelector, useDispatch } from "react-redux"
import { deleteUser } from "../../app/features/usersSlice"

import { toastifyDeleteUser, toastifyFailed } from "../toasts"
import { DeleteUserButton } from "../../css"

export const DeleteUserForm = props => {
  const users = useSelector(state => state.users.value)
  const dispatch = useDispatch()

  const handleDeleteUser = () => {
    const { name, id } = users.find(user => user.id === props.id)
    try {
      async function removeUser() {
        await deleteDoc(doc(db, "users", id))
        dispatch(deleteUser(id))
        console.log("User deleted: ", name, id)
        toastifyDeleteUser(name)
      }
      removeUser()
    } catch (err) {
      toastifyFailed()
      console.log("Error! ->", err)
    }
  }
  return (
    // temporarily disabled to avoid mis-click
    <DeleteUserButton disabled type="button" onClick={() => handleDeleteUser()}>
      Delete
    </DeleteUserButton>
  )
}
