import React from "react"
import { DashboardProfileContainer } from "../elements"

export const DashboardProfile = props => {
  return (
    <DashboardProfileContainer>
      <div className="basic-info">
        <h2>
          {props.firstName} {props.lastName}
        </h2>
        <hr />
        <p>{props.email}</p>
        <p>
          {props.location} - {props.position}
        </p>
        <p>{props.hireDate}</p>
      </div>
      <h3 style={{ margin: "1rem 0", textAlign: "center" }}>
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
  )
}
