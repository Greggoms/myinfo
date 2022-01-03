import React from "react"
import { DashboardProfileContainer } from "../elements"

export const DashboardPayRaise = props => {
  return (
    <DashboardProfileContainer>
      {props.timeForRaise === true ? (
        <div className="basic-info">
          <h2>
            {props.firstName} {props.lastName}
          </h2>
          {props.location} - {props.position}
          <hr />
          <div className="hire-date">
            <h4>Hire Date</h4>
            <p>
              {props.hireDate} ({props.monthsWorked.total} Months Ago)
            </p>
          </div>
          {props.promotionDate && (
            <div className="promotion-date">
              <h4>Promotion Date</h4>
              <p>
                {props.promotionDate} ({props.monthsWorked.asPosition} Months
                Ago)
              </p>
            </div>
          )}
          <p>Current Pay: {props.pay}</p>
          {props.pay < 30 && (
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
          )}
        </div>
      ) : null}
    </DashboardProfileContainer>
  )
}
