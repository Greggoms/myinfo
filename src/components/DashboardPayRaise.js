import React, { useState } from "react"
import { PayRaiseChart } from "./PayRaiseChart"
import { DashboardProfileContainer } from "../elements"

export const DashboardPayRaise = props => {
  const [showPayChart, setShowPayChart] = useState(false)

  const handleShowPayChart = () => {
    setShowPayChart(!showPayChart)
  }

  const handleShowPayChartKeyDown = event => {
    if (event.key === "Enter") {
      setShowPayChart(!showPayChart)
      console.log(event.key)
    } else if (event.key === "Escape") {
      setShowPayChart(false)
      console.log(event.key)
    }
  }

  return (
    <DashboardProfileContainer>
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
            month={props.monthsWorked.asPosition}
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
}
