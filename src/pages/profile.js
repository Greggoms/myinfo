import React from "react"
import { UserFireDoc } from "../firebase/UserFireDoc"

const ProfilePage = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <UserFireDoc />
      </div>
    </div>
  )
}

export default ProfilePage
