import React, { useState } from "react"
import { differenceInCalendarDays, differenceInCalendarMonths } from "date-fns"
import scrollTo from "gatsby-plugin-smoothscroll"
import { PayRaiseTable } from "../services/PayRaiseGuide"
import { PayRaiseChart } from "./PayRaiseChart"
import { DashboardProfileContainer } from "../elements"

export const ProfileDetails = props => {
  const [showPayChart, setShowPayChart] = useState(false)

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

  const handleShowPayChart = () => {
    if (showPayChart === false) {
      scrollTo(`#a${props.id}`)
    }
    return setShowPayChart(!showPayChart)
  }

  const handleShowPayChartKeyDown = event => {
    if (event.key === "Enter") {
      setShowPayChart(!showPayChart)
    } else if (event.key === "Escape") {
      setShowPayChart(false)
    }
  }

  return props.layout === "profile" ? (
    <DashboardProfileContainer>
      <div className="basic-info">
        <h2>{props.name}</h2>
        <p>{props.email}</p>
        <p>
          {props.location} - {props.position}
        </p>
        <hr />
      </div>
      <h3 style={{ margin: "2rem 0 0", textAlign: "center" }}>
        {props.hireDate
          ? remainingPTO(
              props.hireDate[0],
              props.hireDate[1],
              props.hireDate[2],
              props.hoursUsed ? props.hoursUsed : 0
            )
          : 0}{" "}
        hours
      </h3>
      <p className="insurance">
        Insurance:{" "}
        {props.insurance
          ? "Yes"
          : props.hireDate &&
            monthsWorked(
              props.hireDate[0],
              props.hireDate[1],
              props.hireDate[2]
            ) < 3
          ? "Not Eligible"
          : "No"}
      </p>
      <div className="request-details">
        {props.pending ? (
          <>
            <h4 key="pending-request" className="pending">
              Pending
            </h4>
            {props.pending.map((request, index) => (
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
        {props.accepted ? (
          <>
            <h4 key="accepted-request" className="accepted">
              Accepted
            </h4>
            {props.accepted.map((request, index) => (
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
  ) : props.hireDate &&
    props.pay <
      eligibleAmount(
        props.hireDate[0],
        props.hireDate[1],
        props.hireDate[2],
        props.position
      ) ? (
    <DashboardProfileContainer>
      <div className="pay-raise-effect" id={`a${props.id}`}>
        <div className="basic-info">
          <h2>{props.name}</h2>
          {props.location} - {props.position}
          <hr />
          <div className="hire-date">
            <h4>Hire Date</h4>
            <p>
              {props.hireDate
                ? `${props.hireDate[1]}/${props.hireDate[2]}/${props.hireDate[0]}`
                : "No Hire Date"}{" "}
              (
              {props.hireDate
                ? monthsWorked(
                    props.hireDate[0],
                    props.hireDate[1],
                    props.hireDate[2]
                  )
                : null}{" "}
              Months Ago)
            </p>
          </div>
          {props.promotionDate && (
            <div className="promotion-date">
              <h4>Promotion Date</h4>
              <p>
                {props.promotionDate} (
                {monthsWorked(
                  props.promotionDate[0],
                  props.promotionDate[1],
                  props.promotionDate[2]
                )}{" "}
                Months Ago)
              </p>
            </div>
          )}
          <p>Current Pay: {props.pay}</p>
          <div style={{ display: "flex" }}>
            {props.pay < 30 && (
              <>
                <p>
                  Eligible For:{" "}
                  <span
                    style={
                      props.pay >
                      eligibleAmount(
                        props.hireDate[0],
                        props.hireDate[1],
                        props.hireDate[2],
                        props.position
                      )
                        ? { color: "#E65A56" }
                        : { color: "#96F094" }
                    }
                  >
                    {props.promotionDate
                      ? eligibleAmount(
                          props.promotionDate[0],
                          props.promotionDate[1],
                          props.promotionDate[2],
                          props.position
                        )
                      : eligibleAmount(
                          props.hireDate[0],
                          props.hireDate[1],
                          props.hireDate[2],
                          props.position
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
        {showPayChart && (
          <PayRaiseChart
            position={props.position}
            month={
              props.promotionDate
                ? monthsWorked(
                    props.promotionDate[0],
                    props.promotionDate[1],
                    props.promotionDate[2],
                    props.position
                  )
                : monthsWorked(
                    props.hireDate[0],
                    props.hireDate[1],
                    props.hireDate[2],
                    props.position
                  )
            }
          />
        )}
      </div>
    </DashboardProfileContainer>
  ) : null
}
