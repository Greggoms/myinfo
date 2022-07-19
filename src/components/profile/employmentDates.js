import React from "react"
import { useSelector } from "react-redux"
import { selectUserFireDoc } from "../../app/features/userSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"
import { format } from "date-fns"
import { timeWorkedLong } from "../../utils/dateHelpers"
import { EmploymentDatesContainer } from "../../css"

const EmploymentDates = () => {
  const userFireDoc = useSelector(selectUserFireDoc)
  return (
    <EmploymentDatesContainer>
      <FontAwesomeIcon icon={faCalendarDays} />
      <div className="words">
        <div>
          <span>Hire Date:</span>
          {userFireDoc.hireDate ? (
            <>
              <p>
                {format(
                  new Date(
                    userFireDoc.hireDate.split("-")[0],
                    userFireDoc.hireDate.split("-")[1] - 1,
                    userFireDoc.hireDate.split("-")[2]
                  ),
                  `PPPP`
                )}
              </p>
              <span>
                {timeWorkedLong(
                  userFireDoc.hireDate.split("-")[0],
                  userFireDoc.hireDate.split("-")[1],
                  userFireDoc.hireDate.split("-")[2]
                )}
              </span>
            </>
          ) : (
            <p>No hire date</p>
          )}
        </div>

        <div>
          <span>Last Review:</span>
          {userFireDoc.lastRaise ? (
            <>
              <p>
                {format(
                  new Date(
                    userFireDoc.lastRaise.split("-")[0],
                    userFireDoc.lastRaise.split("-")[1] - 1,
                    userFireDoc.lastRaise.split("-")[2]
                  ),
                  `PPPP`
                )}
              </p>
              <span>
                {timeWorkedLong(
                  userFireDoc.lastRaise.split("-")[0],
                  userFireDoc.lastRaise.split("-")[1],
                  userFireDoc.lastRaise.split("-")[2]
                )}
              </span>
            </>
          ) : (
            <p>No review date</p>
          )}
        </div>
        <div>
          <span>Promotion Date:</span>
          {userFireDoc.promotionDate ? (
            <>
              <p>
                {format(
                  new Date(
                    userFireDoc.promotionDate.split("-")[0],
                    userFireDoc.promotionDate.split("-")[1] - 1,
                    userFireDoc.promotionDate.split("-")[2]
                  ),
                  `PPPP`
                )}
              </p>
              <span>
                {timeWorkedLong(
                  userFireDoc.promotionDate.split("-")[0],
                  userFireDoc.promotionDate.split("-")[1],
                  userFireDoc.promotionDate.split("-")[2]
                )}
              </span>
            </>
          ) : (
            <p>No promotion date</p>
          )}
        </div>
      </div>
    </EmploymentDatesContainer>
  )
}

export default EmploymentDates
