import { toast } from "react-toastify"

export const toastifyAccountCreation = email => {
  toast(`Account Created! - ${email}`, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "submit-feedback success",
  })
}
export const toastifySignIn = user => {
  toast(`Welcome ${user}!`, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "submit-feedback success",
  })
}
export const toastifyPasswordReset = email => {
  toast(`Password reset link sent to ${email}`, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "submit-feedback success",
  })
}

export const toastifyDeleteUser = name => {
  toast.info(
    `${name}'s
      FireDoc has been deleted. Visit https://console.firebase.google.com/u/4/project/abbyhq-35b53/authentication/users
      to manually remove their Auth.`,
    {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      className: "submit-feedback info",
    }
  )
}

export const toastifyInfo = info => {
  toast.info(info, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "submit-feedback info",
  })
}

export const toastifyFailed = err => {
  toast.error(err, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "submit-feedback error",
  })
}
