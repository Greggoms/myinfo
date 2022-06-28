import React, { useEffect } from "react"
import { UserFireDoc } from "../firebase/UserFireDoc"

const ProfilePage = () => {
  useEffect(() => {
    if (window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }, [])

  return <UserFireDoc />
}

export default ProfilePage
