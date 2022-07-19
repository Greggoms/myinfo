import React from "react"
import { useSelector } from "react-redux"
import { selectUserAuth, selectUserFireDoc } from "../../app/features/userSlice"
import { GatsbySeo } from "gatsby-plugin-next-seo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"

import EmployeeInfo from "./employeeInfo"
import RemainingPto from "./remainingPto"
import PtoRequestForm from "../forms/PtoRequestForm"
import PtoRequestStatus from "./ptoRequestStatus"
import EmploymentDates from "./employmentDates"
import AccountInfo from "./accountInfo"
import { ProfileContainer } from "../../css"

const UserFireDoc = () => {
  const userAuth = useSelector(selectUserAuth)
  const userFireDoc = useSelector(selectUserFireDoc)

  if (userAuth && !userFireDoc) {
    return <h2 style={{ textAlign: "center" }}>Fetching your Profile...</h2>
  }

  return (
    <>
      <GatsbySeo
        nofollow={true}
        noindex={true}
        title={`${userFireDoc.name}'s Profile | AbbyHQ`}
      />
      <ProfileContainer>
        <div className="paystub-info">
          <FontAwesomeIcon icon={faCircleInfo} />
          <p>
            Paystubs are available through{" "}
            <a href="https://identity.payentry.com/Account/Login">Payentry</a>
          </p>
        </div>
        <EmployeeInfo />
        <RemainingPto />
        {/*
          Done this way to give the form
          more flexibility if used elsewhere.
        */}
        <div className="pto-request-form">
          <PtoRequestForm />
        </div>
        <PtoRequestStatus />
        <EmploymentDates />
        <AccountInfo />
      </ProfileContainer>
    </>
  )
}

export default UserFireDoc
