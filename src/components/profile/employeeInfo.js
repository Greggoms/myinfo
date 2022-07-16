import React from "react"
import { useSelector } from "react-redux"
import { selectUserFireDoc } from "../../app/features/userSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faIdBadge,
  faMoneyBill1Wave,
  faCashRegister,
  faBriefcaseMedical,
} from "@fortawesome/free-solid-svg-icons"
import { lifetimePTO } from "../../utils/dateHelpers"
import { EmployeeInfoContainer } from "../../css"

const EmployeeInfo = () => {
  const userFireDoc = useSelector(selectUserFireDoc)
  return (
    <EmployeeInfoContainer>
      <aside className="aside-1">
        <h2>{userFireDoc.name.split(" ")[0]}</h2>
        <hr className="flexed" />
        <div className="aside-info">
          <div className="aside-info__piece">
            <FontAwesomeIcon icon={faIdBadge} />
            {userFireDoc.position ? (
              <p>{userFireDoc.position}</p>
            ) : (
              <p>Position not set</p>
            )}
          </div>

          <div className="aside-info__piece">
            <FontAwesomeIcon icon={faMoneyBill1Wave} />
            {userFireDoc.pay ? (
              <p>{userFireDoc.pay}</p>
            ) : (
              <p>Pay rate not set</p>
            )}
          </div>

          <div className="aside-info__piece">
            <FontAwesomeIcon icon={faCashRegister} />
            {userFireDoc.location ? (
              <p>{userFireDoc.location}</p>
            ) : (
              <p>Location not set</p>
            )}
          </div>

          <div className="aside-info__piece">
            <FontAwesomeIcon icon={faBriefcaseMedical} />
            <p>{userFireDoc.insurance === true ? "Opt-IN" : "Opt-OUT"}</p>
          </div>
        </div>
      </aside>
      <aside className="aside-2">
        <h3>Stats</h3>
        <hr className="flexed" />
        <div className="stats">
          <div className="stat">
            {userFireDoc.hireDate ? (
              <p>
                Lifetime PTO:{" "}
                {lifetimePTO(
                  userFireDoc.hireDate.split("-")[0],
                  userFireDoc.hireDate.split("-")[1],
                  userFireDoc.hireDate.split("-")[2]
                )}{" "}
                hours
              </p>
            ) : (
              <p>No Hire Date</p>
            )}
          </div>
          <div className="stat">
            {userFireDoc.hoursUsed ? (
              <p>PTO Used: {userFireDoc.hoursUsed} hours</p>
            ) : (
              <p>No PTO Used</p>
            )}
          </div>
        </div>
      </aside>
    </EmployeeInfoContainer>
  )
}

export default EmployeeInfo
