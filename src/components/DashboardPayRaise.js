import React, { useState } from "react"
import { PayRaiseChart } from "./PayRaiseChart"
import { DashboardProfileContainer } from "../elements"

export const DashboardPayRaise = props => {
  const [showPayChart, setShowPayChart] = useState(false)

  const handleShowPayChart = () => {
    setShowPayChart(!showPayChart)
  }

  return (
    <DashboardProfileContainer>
      <div className="pay-raise-effect">
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
                  >
                    See why
                  </span>
                </>
              )}
            </div>
          </div>
        ) : null}
        {showPayChart ? (
          <PayRaiseChart
            position={props.position}
            month={props.monthsWorked.asPosition}
            className="pay-effect"
          />
        ) : null}
      </div>
    </DashboardProfileContainer>
  )
}
