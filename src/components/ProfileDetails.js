import React, { useState } from "react"
import { getFirestore, updateDoc, doc } from "firebase/firestore"
import { differenceInCalendarMonths } from "date-fns"
import { DashboardProfileContainer } from "../elements"

export const ProfileDetails = props => {
  const db = getFirestore()
  const [checked, setChecked] = useState(false)
  const [basicInfo, setBasicInfo] = useState(false)
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

  const handleIsEligible = (year, month, day, position) => {
    const result = differenceInCalendarMonths(
      new Date(currentYear, currentMonth, currentDay),
      new Date(year, month, day)
    )
    if (position === "Associate") {
      return result >= 3
    } else {
      return result >= 6
    }
  }

  const handleResetRaise = () => {
    try {
      // Update current user's document on Firestore
      async function updateFireDoc() {
        await updateDoc(doc(db, `users/${props.id}`), {
          lastRaise: [currentYear, currentMonth, currentDay],
        })
      }
      updateFireDoc()
    } catch (err) {
      console.log("Error updating: ", err)
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
      <div>
        <p>
          <strong>Hire Date</strong>
        </p>
        <p>
          {props.hireDate[1]}/{props.hireDate[2]}/{props.hireDate[0]} (
          {monthsWorked(
            props.hireDate[0],
            props.hireDate[1],
            props.hireDate[2]
          )}{" "}
          months)
        </p>
      </div>
      {props.promotionDate && (
        <div style={{ marginTop: "10px" }}>
          <p>
            <strong>Promotion Date</strong>
          </p>
          <p>
            {props.promotionDate[1]}/{props.promotionDate[2]}/
            {props.promotionDate[0]} (
            {monthsWorked(
              props.promotionDate[0],
              props.promotionDate[1],
              props.promotionDate[2]
            )}{" "}
            months)
          </p>
        </div>
      )}
      {props.lastRaise && (
        <div style={{ marginTop: "10px" }}>
          <p>
            <strong>Last Raise</strong>
          </p>
          <p>
            {props.lastRaise[1]}/{props.lastRaise[2]}/{props.lastRaise[0]} (
            {monthsWorked(
              props.lastRaise[0],
              props.lastRaise[1],
              props.lastRaise[2]
            )}{" "}
            months)
          </p>
        </div>
      )}
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
        ) : null}
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
        ) : null}
      </div>
    </DashboardProfileContainer>
  ) : props.lastRaise &&
    handleIsEligible(
      props.lastRaise[0],
      props.lastRaise[1],
      props.lastRaise[2],
      props.position
    ) ? (
    <DashboardProfileContainer>
      <div className="basic-info">
        <h2>{props.name}</h2>
        {props.location} - {props.position}
        <hr />
        <div style={{ margin: "10px 0" }}>
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
            months)
          </p>
        </div>
        {props.promotionDate && (
          <div style={{ margin: "10px 0" }}>
            <h4>Promotion Date</h4>
            <p>
              {props.promotionDate[1]}/{props.promotionDate[2]}/
              {props.promotionDate[0]} (
              {monthsWorked(
                props.promotionDate[0],
                props.promotionDate[1],
                props.promotionDate[2]
              )}{" "}
              months)
            </p>
          </div>
        )}
        <div style={{ margin: "10px 0" }}>
          <p>
            <strong>Last Raise</strong>
          </p>
          {props.lastRaise !== undefined ? (
            <p>
              {props.lastRaise[1]}/{props.lastRaise[2]}/{props.lastRaise[0]} (
              {monthsWorked(
                props.lastRaise[0],
                props.lastRaise[1],
                props.lastRaise[2]
              )}{" "}
              months)
            </p>
          ) : (
            <p>Unknown</p>
          )}
        </div>
        <p>Current Pay: {props.pay}</p>
      </div>
      <div className="update-pay">
        <label>
          Ready for Raise?{" "}
          <input type="checkbox" onClick={() => setChecked(!checked)} />
        </label>
        <button
          onClick={() => {
            handleResetRaise()
            props.handleRefresh()
          }}
          disabled={!checked}
        >
          Reset Timer
        </button>
      </div>
    </DashboardProfileContainer>
  ) : null
}
