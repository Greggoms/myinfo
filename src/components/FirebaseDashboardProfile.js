import React, { useState, useEffect } from "react"
import { getFirestore, collection, getDocs, query } from "firebase/firestore"
import { differenceInCalendarDays, differenceInCalendarMonths } from "date-fns"
import { v4 as uuidv4 } from "uuid"
import scrollTo from "gatsby-plugin-smoothscroll"
import { PayRaiseTable } from "../services/PayRaiseGuide"
import { PayRaiseChart } from "../components/PayRaiseChart"
import { DashboardProfileContainer } from "../elements"

export const FirebaseDashboardProfile = props => {
  const [showPayChart, setShowPayChart] = useState(false)
  const [list, setList] = useState([])

  // Initialize an instance of Cloud Firestore
  useEffect(() => {
    const db = getFirestore()
    const q = query(collection(db, "users"))

    async function getUsers() {
      const querySnapshot = await getDocs(q)
      setList(querySnapshot.docs.map(data => data.data()))
    }
    getUsers()
  }, [])

  const currentYear = new Date().getFullYear()
  const currentMonth = parseInt(new Date().getMonth() + 1)
  const currentDay = new Date().getDate()

  const monthsWorked = (year, month, day) => {
    const result = differenceInCalendarMonths(
      new Date(currentYear, currentMonth, currentDay),
      new Date(year, month, day)
    )
    return result
  }

  const eligibleAmount = (
    promotionYear,
    promotionMonth,
    promotionDay,
    position
  ) => {
    const result = differenceInCalendarMonths(
      new Date(currentYear, currentMonth, currentDay),
      new Date(promotionYear, promotionMonth, promotionDay)
    )
    if (position === "Assist Mngr" && result < 6) {
      return PayRaiseTable.assistMngr.month0
    } else if (position === "Assist Mngr" && result >= 6 && result < 12) {
      return PayRaiseTable.assistMngr.month6
    } else if (position === "Assist Mngr" && result >= 12 && result < 18) {
      return PayRaiseTable.assistMngr.month12
    } else if (position === "Assist Mngr" && result >= 18 && result < 24) {
      return PayRaiseTable.assistMngr.month18
    } else if (position === "Assist Mngr" && result >= 24) {
      return PayRaiseTable.assistMngr.month24
    }
    if (position === "Manager" && result < 6) {
      return PayRaiseTable.manager.month0
    } else if (position === "Manager" && result >= 6 && result < 12) {
      return PayRaiseTable.manager.month6
    } else if (position === "Manager" && result >= 12 && result < 18) {
      return PayRaiseTable.manager.month12
    } else if (position === "Manager" && result >= 18 && result < 24) {
      return PayRaiseTable.manager.month18
    } else if (position === "Manager" && result >= 24) {
      return PayRaiseTable.manager.month24
    }
    if (position === "Associate" && result < 3) {
      return PayRaiseTable.associate.month0
    } else if (position === "Associate" && result >= 3 && result < 6) {
      return PayRaiseTable.associate.month3
    } else if (position === "Associate" && result >= 6 && result < 9) {
      return PayRaiseTable.associate.month6
    } else if (position === "Associate" && result >= 9 && result < 12) {
      return PayRaiseTable.associate.month9
    } else if (position === "Associate" && result >= 12 && result < 15) {
      return PayRaiseTable.associate.month12
    } else if (position === "Associate" && result >= 15 && result < 18) {
      return PayRaiseTable.associate.month15
    } else if (position === "Associate" && result >= 18 && result < 21) {
      return PayRaiseTable.associate.month18
    } else if (position === "Associate" && result >= 21 && result < 24) {
      return PayRaiseTable.associate.month21
    } else if (position === "Associate" && result >= 24) {
      return PayRaiseTable.associate.month24
    }
  }

  const remainingPTO = (hireYear, hireMonth, hireDay, hoursUsed, pending) => {
    const result = differenceInCalendarDays(
      new Date(currentYear, currentMonth, currentDay),
      new Date(hireYear, hireMonth, hireDay)
    )
    return pending
      ? `${Math.floor(result / 91) * 10 - hoursUsed} - (${pending
          .map(({ hours }) => hours)
          .join(` + `)} Pending)`
      : Math.floor(result / 91) * 10 - hoursUsed
  }

  const id = `a${uuidv4()}`
  const handleShowPayChart = () => {
    setShowPayChart(!showPayChart)
    if (showPayChart === false) {
      scrollTo(`#${id}`)
    }
  }

  const handleShowPayChartKeyDown = event => {
    if (event.key === "Enter") {
      setShowPayChart(!showPayChart)
    } else if (event.key === "Escape") {
      setShowPayChart(false)
    }
  }

  return props.layout === "profile"
    ? list.map(user => (
        <DashboardProfileContainer key={user.email}>
          <div className="basic-info">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>
              {user.location} - {user.position}
            </p>
            <hr />
          </div>
          <h3 style={{ margin: "2rem 0 0", textAlign: "center" }}>
            {user.hireDate
              ? remainingPTO(
                  user.hireDate[0],
                  user.hireDate[1],
                  user.hireDate[2],
                  user.hoursUsed ? user.hoursUsed : 0
                )
              : 0}{" "}
            hours
          </h3>
          <div className="request-details">
            {user.pending ? (
              <>
                <h4 key="pending-request" className="pending">
                  Pending
                </h4>
                {user.pending.map((request, index) => (
                  <ul key={index}>
                    <li>
                      {request.dates.length === 1
                        ? `${request.dates} `
                        : `${request.dates[0]} to ${request.dates[1]} `}
                      using {request.hours} hours.
                    </li>
                  </ul>
                ))}
              </>
            ) : (
              <p>No pending requests.</p>
            )}
          </div>
          <div className="request-details">
            {user.accepted ? (
              <>
                <h4 key="accepted-request" className="accepted">
                  Accepted
                </h4>
                {user.accepted.map((request, index) => (
                  <ul key={index}>
                    <li>
                      {request.dates.length === 1
                        ? `${request.dates} `
                        : `${request.dates[0]} to ${request.dates[1]} `}
                      using {request.hours} hours.
                    </li>
                  </ul>
                ))}
              </>
            ) : (
              <p>No PTO usage | Pending request</p>
            )}
          </div>
        </DashboardProfileContainer>
      ))
    : list.map(user =>
        user.hireDate
          ? user.pay <
              eligibleAmount(
                user.hireDate[0],
                user.hireDate[1],
                user.hireDate[2],
                user.position
              ) && (
              <DashboardProfileContainer key={`abc${id}`} id={id}>
                <div className="pay-raise-effect">
                  <div className="basic-info">
                    <h2>{user.name}</h2>
                    {user.location} - {user.position}
                    <hr />
                    <div className="hire-date">
                      <h4>Hire Date</h4>
                      <p>
                        {user.hireDate
                          ? `${user.hireDate[1]}/${user.hireDate[2]}/${user.hireDate[0]}`
                          : "No Hire Date"}{" "}
                        (
                        {user.hireDate
                          ? monthsWorked(
                              user.hireDate[0],
                              user.hireDate[1],
                              user.hireDate[2]
                            )
                          : null}{" "}
                        Months Ago)
                      </p>
                    </div>
                    {user.promotionDate && (
                      <div className="promotion-date">
                        <h4>Promotion Date</h4>
                        <p>
                          {user.promotionDate} (
                          {monthsWorked(
                            user.promotionDate[0],
                            user.promotionDate[1],
                            user.promotionDate[2]
                          )}{" "}
                          Months Ago)
                        </p>
                      </div>
                    )}
                    <p>Current Pay: {user.pay}</p>
                    <div style={{ display: "flex" }}>
                      {user.pay < 30 && (
                        <>
                          <p>
                            Eligible For:{" "}
                            <span
                              style={
                                user.pay >
                                eligibleAmount(
                                  user.hireDate[0],
                                  user.hireDate[1],
                                  user.hireDate[2],
                                  user.position
                                )
                                  ? { color: "#E65A56" }
                                  : { color: "#96F094" }
                              }
                            >
                              {user.promotionDate
                                ? eligibleAmount(
                                    user.promotionDate[0],
                                    user.promotionDate[1],
                                    user.promotionDate[2],
                                    user.position
                                  )
                                : eligibleAmount(
                                    user.hireDate[0],
                                    user.hireDate[1],
                                    user.hireDate[2],
                                    user.position
                                  )}
                            </span>
                          </p>
                          <span
                            style={{
                              marginLeft: "10px",
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                            onClick={handleShowPayChart}
                            onKeyDown={handleShowPayChartKeyDown}
                            role="button"
                            tabIndex={0}
                          >
                            See why
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {showPayChart ? (
                    <PayRaiseChart
                      position={user.position}
                      month={
                        user.promotionDate
                          ? monthsWorked(
                              user.promotionDate[0],
                              user.promotionDate[1],
                              user.promotionDate[2],
                              user.position
                            )
                          : monthsWorked(
                              user.hireDate[0],
                              user.hireDate[1],
                              user.hireDate[2],
                              user.position
                            )
                      }
                      active={showPayChart}
                    />
                  ) : (
                    <div
                      className={
                        user.position === "Associate"
                          ? "associate-div"
                          : "manager-div"
                      }
                    ></div>
                  )}
                </div>
              </DashboardProfileContainer>
            )
          : null
      )
}
