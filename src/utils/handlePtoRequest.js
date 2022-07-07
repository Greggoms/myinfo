import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore"
import { db } from "../firebase/firebaseInit"
import { store } from "../app/store"
import { approvePtoRequest, denyPtoRequest } from "../app/features/usersSlice"
import { toast } from "react-toastify"

const handlePtoRequest = (e, id, index) => {
  const person = store.getState().users.value.find(person => person.id === id)
  const userRef = doc(db, "users", person.id)
  if (e.target.id === "approve") {
    store.dispatch(
      approvePtoRequest({
        id: person.id,
        request: person.pto.submitted[index],
      })
    )
    async function approvePto() {
      await updateDoc(userRef, {
        "pto.submitted": arrayRemove(person.pto.submitted[index]),
        "pto.pending": arrayUnion(person.pto.submitted[index]),
      })
    }
    approvePto()
    toast.success(
      `${person.name}'s request for ${person.pto.submitted[index].dates} has been approved!`
    )
  } else {
    store.dispatch(
      denyPtoRequest({ id: person.id, request: person.pto.submitted[index] })
    )
    async function denyPto() {
      await updateDoc(userRef, {
        "pto.submitted": arrayRemove(person.pto.submitted[index]),
        "pto.denied": arrayUnion(person.pto.submitted[index]),
      })
    }
    denyPto()
    toast.info(`${person.name}'s request has been denied.`)
  }
}

export default handlePtoRequest
