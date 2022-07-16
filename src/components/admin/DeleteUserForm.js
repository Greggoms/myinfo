import React from "react"
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../../services/firebaseInit"
import { useSelector, useDispatch } from "react-redux"
import { deleteUser } from "../../app/features/usersSlice"
import { toast } from "react-toastify"
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
        toast.info(
          `${name}'s
      FireDoc has been deleted. Visit https://console.firebase.google.com/u/4/project/abbyhq-35b53/authentication/users
      to manually remove their Auth.`,
          {
            autoClose: false,
            closeOnClick: true,
          }
        )
      }
      removeUser()
    } catch (err) {
      toast.error(err.message)
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
