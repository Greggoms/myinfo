import { auth } from "../firebase/firebaseInit"
import { navigate } from "@reach/router"
import { signInWithEmailAndPassword } from "firebase/auth"
import { toast } from "react-toastify"

const handleLogin = async (e, { email, password }) => {
  e.preventDefault()
  signInWithEmailAndPassword(auth, email, password)
    .then(userAuth => {
      const user = userAuth.user
      toast(`Welcome ${user.displayName}!`)
      navigate("/app/profile")
    })
    .catch(error => {
      const errorCode = error.code
      const errorMessage = error.message
      console.error(errorCode, "=>", errorMessage)
      if (errorCode === "auth/user-not-found") {
        toast.error("No account detected! Try registering instead.")
      } else if (errorCode === "auth/invalid-email") {
        toast.error("Please use a valid email format.")
      } else {
        toast.error(errorMessage)
      }
    })
}

export default handleLogin
