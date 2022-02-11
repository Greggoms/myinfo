import React from "react"
import { PayRaiseTable } from "../services/PayRaiseGuide"
import { PayRaiseChartContainer } from "../elements"
import "../components/animations.css"

export const PayRaiseChart = props => {
  const handleSetPayChart = () => {
    if (props.position === "Associate") {
      return (
        <>
          <div className="month-amount">
            <h3 className="month-header">Month</h3>
            <h3 className="amount-header">Amount</h3>
            <div
              className={
                props.month >= 0 && props.month < 3 ? "active" : "inactive"
              }
            >
              <p>0</p>
              <p>${PayRaiseTable.associate.month0}</p>
            </div>
            <div
              className={
                props.month >= 3 && props.month < 6 ? "active" : "inactive"
              }
            >
              <p>3</p>
              <p>${PayRaiseTable.associate.month3}</p>
            </div>
            <div
              className={
                props.month >= 6 && props.month < 9 ? "active" : "inactive"
              }
            >
              <p>6</p>
              <p>${PayRaiseTable.associate.month6}</p>
            </div>
            <div
              className={
                props.month >= 9 && props.month < 12 ? "active" : "inactive"
              }
            >
              <p>9</p>
              <p>${PayRaiseTable.associate.month9}</p>
            </div>
            <div
              className={
                props.month >= 12 && props.month < 15 ? "active" : "inactive"
              }
            >
              <p>12</p>
              <p>${PayRaiseTable.associate.month12}</p>
            </div>
            <div
              className={
                props.month >= 15 && props.month < 18 ? "active" : "inactive"
              }
            >
              <p>15</p>
              <p>${PayRaiseTable.associate.month15}</p>
            </div>
            <div
              className={
                props.month >= 18 && props.month < 21 ? "active" : "inactive"
              }
            >
              <p>18</p>
              <p>${PayRaiseTable.associate.month18}</p>
            </div>
            <div
              className={
                props.month >= 21 && props.month < 24 ? "active" : "inactive"
              }
            >
              <p>21</p>
              <p>${PayRaiseTable.associate.month21}</p>
            </div>
            <div className={props.month >= 24 ? "active" : "inactive"}>
              <p>24</p>
              <p>${PayRaiseTable.associate.month24}</p>
            </div>
          </div>
        </>
      )
    } else if (props.position === "Assist Mngr") {
      return (
        <>
          <div className="month-amount">
            <h3 className="month-header">Month</h3>
            <h3 className="amount-header">Amount</h3>
            <div
              className={
                props.month >= 0 && props.month < 6 ? "active" : "inactive"
              }
            >
              <p>0</p>
              <p>${PayRaiseTable.assistMngr.month0}</p>
            </div>
            <div
              className={
                props.month >= 6 && props.month < 12 ? "active" : "inactive"
              }
            >
              <p>6</p>
              <p>${PayRaiseTable.assistMngr.month6}</p>
            </div>
            <div
              className={
                props.month >= 12 && props.month < 18 ? "active" : "inactive"
              }
            >
              <p>12</p>
              <p>${PayRaiseTable.assistMngr.month12}</p>
            </div>
            <div
              className={
                props.month >= 18 && props.month < 24 ? "active" : "inactive"
              }
            >
              <p>18</p>
              <p>${PayRaiseTable.assistMngr.month18}</p>
            </div>
            <div className={props.month >= 24 ? "active" : "inactive"}>
              <p>24</p>
              <p>${PayRaiseTable.assistMngr.month24}</p>
            </div>
          </div>
        </>
      )
    } else if (props.position === "Manager") {
      return (
        <>
          <div className="month-amount">
            <h3 className="month-header">Month</h3>
            <h3 className="amount-header">Amount</h3>
            <div
              className={
                props.month >= 0 && props.month < 6 ? "active" : "inactive"
              }
            >
              <p>0</p>
              <p>${PayRaiseTable.manager.month0}</p>
            </div>
            <div
              className={
                props.month >= 6 && props.month < 12 ? "active" : "inactive"
              }
            >
              <p>6</p>
              <p>${PayRaiseTable.manager.month6}</p>
            </div>
            <div
              className={
                props.month >= 12 && props.month < 18 ? "active" : "inactive"
              }
            >
              <p>12</p>
              <p>${PayRaiseTable.manager.month12}</p>
            </div>
            <div
              className={
                props.month >= 18 && props.month < 24 ? "active" : "inactive"
              }
            >
              <p>18</p>
              <p>${PayRaiseTable.manager.month18}</p>
            </div>
            <div className={props.month >= 24 ? "active" : "inactive"}>
              <p>24</p>
              <p>${PayRaiseTable.manager.month24}</p>
            </div>
          </div>
        </>
      )
    }
  }
  return (
    <PayRaiseChartContainer
      className={props.position === "Associate" ? "associate" : "manager"}
    >
      <div className="position-select">
        <h2>Position</h2>
        <p>{props.position}</p>
      </div>
      <div className="pay-guide">{handleSetPayChart()}</div>
    </PayRaiseChartContainer>
  )
}
