import React from "react"
import { useSelector } from "react-redux"
import { selectUserFireDoc } from "../../app/features/userSlice"
import {
  dateFor10Hrs,
  daysUntil10Hrs,
  getRemainingPto,
} from "../../utils/dateHelpers"
import { RemainingPtoContainer } from "../../css"

const RemainingPto = () => {
  const userFireDoc = useSelector(selectUserFireDoc)

  return (
    <RemainingPtoContainer>
      <div className="badge">
        {userFireDoc.hireDate ? (
          <>
            <h2>
              {getRemainingPto(
                userFireDoc.hireDate.split("-")[0],
                userFireDoc.hireDate.split("-")[1],
                userFireDoc.hireDate.split("-")[2],
                userFireDoc.hoursUsed ? userFireDoc.hoursUsed : 0,
                userFireDoc.pto && userFireDoc.pto.pending
                  ? userFireDoc.pto.pending
                  : null
              )}
            </h2>
            <p>Available Hours</p>
          </>
        ) : (
          <h2>No Hire Date</h2>
        )}
      </div>
      <div className="badge">
        {userFireDoc.hireDate ? (
          <>
            <h2>
              +10 hours in{" "}
              {daysUntil10Hrs(
                userFireDoc.hireDate.split("-")[0],
                userFireDoc.hireDate.split("-")[1],
                userFireDoc.hireDate.split("-")[2]
              )}{" "}
              days
            </h2>
            <p>on</p>
            <p>
              {dateFor10Hrs(
                userFireDoc.hireDate.split("-")[0],
                userFireDoc.hireDate.split("-")[1],
                userFireDoc.hireDate.split("-")[2]
              )}
            </p>
          </>
        ) : (
          <h2>No Hire Date</h2>
        )}
      </div>
    </RemainingPtoContainer>
  )
}

export default RemainingPto
