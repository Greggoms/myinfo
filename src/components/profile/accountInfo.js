import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserGear } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"
import { selectUserFireDoc } from "../../app/features/userSlice"
import { AccountInfoContainer } from "../../css"

const AccountInfo = () => {
  const userFireDoc = useSelector(selectUserFireDoc)

  return (
    <AccountInfoContainer>
      <FontAwesomeIcon icon={faUserGear} />
      <div className="account-words">
        <p>{userFireDoc.email}</p>
        <p>Role: {userFireDoc.role}</p>
        <p>Firebase ID: {userFireDoc.id}</p>
      </div>
    </AccountInfoContainer>
  )
}

export default AccountInfo
