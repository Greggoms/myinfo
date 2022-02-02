import React, { useState } from "react"
import { PayRaiseChart } from "./PayRaiseChart"
import scrollTo from "gatsby-plugin-smoothscroll"
import { DashboardProfileContainer } from "../elements"

export const FirebaseDashboardProfile = props => {
  const [showPayChart, setShowPayChart] = useState(false)
  const id = `a${props.id}`

  const handleShowPayChart = () => {
    setShowPayChart(!showPayChart)
    if (showPayChart === false) {
      scrollTo(`#a${props.id}`)
    }
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
        <h2>
          {props.firstName} {props.lastName}
        </h2>
        <p>{props.email}</p>
        <p>
          {props.location} - {props.position}
        </p>
        <hr />
      </div>
      <h3 style={{ margin: "2rem 0 0", textAlign: "center" }}>
        {props.remainingPTO} hours
      </h3>
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
  ) : (
    props.pay < props.eligible && (
      <DashboardProfileContainer id={id}>
        <div className="pay-raise-effect">
          <div className="basic-info">
            <h2>
              {props.firstName} {props.lastName}
            </h2>
            {props.location} - {props.position}
            <hr />
            <div className="hire-date">
              <h4>Hire Date</h4>
              <p>
                {props.hireDate} (
                {props.monthsWorkedTotal ? props.monthsWorkedTotal : null}{" "}
                Months Ago)
              </p>
            </div>
            {props.promotionDate && (
              <div className="promotion-date">
                <h4>Promotion Date</h4>
                <p>
                  {props.promotionDate} ({props.monthsWorkedAsPosition} Months
                  Ago)
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
                        props.pay > props.eligible
                          ? { color: "#E65A56" }
                          : { color: "#96F094" }
                      }
                    >
                      {props.eligible}
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
              position={props.position}
              month={
                props.promotionDate !== null
                  ? props.monthsWorkedAsPosition
                  : props.monthsWorkedTotal
              }
              active={showPayChart}
            />
          ) : (
            <div
              className={
                props.position === "Associate" ? "associate-div" : "manager-div"
              }
            ></div>
          )}
        </div>
      </DashboardProfileContainer>
    )
  )
}
