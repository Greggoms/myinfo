import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore"
import { db } from "../services/firebaseInit"
import { store } from "../app/store"
import { approvePtoRequest, denyPtoRequest } from "../app/features/usersSlice"
import { toast } from "react-toastify"

const handlePtoRequest = ({ event, user, reqIndex }) => {
  const userRef = doc(db, "users", user.id)
  async function approvePto() {
    await updateDoc(userRef, {
      "pto.submitted": arrayRemove(user.pto.submitted[reqIndex]),
      "pto.pending": arrayUnion(user.pto.submitted[reqIndex]),
    })
  }
  async function denyPto() {
    await updateDoc(userRef, {
      "pto.submitted": arrayRemove(user.pto.submitted[reqIndex]),
      "pto.denied": arrayUnion(user.pto.submitted[reqIndex]),
    })
  }

  try {
    if (event.target.name === "approve") {
      store.dispatch(
        approvePtoRequest({
          id: user.id,
          request: user.pto.submitted[reqIndex],
        })
      )
      approvePto()
      toast.success(
        `${user.name}'s request for ${user.pto.submitted[reqIndex].dates} has been approved!`
      )
    } else {
      store.dispatch(
        denyPtoRequest({ id: user.id, request: user.pto.submitted[reqIndex] })
      )
      denyPto()
      toast.info(`${user.name}'s request has been denied.`)
    }
  } catch (e) {
    console.error(e.message)
    toast.error(e.message)
  }
}

export default handlePtoRequest
