import React, { useState, useEffect } from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { addDays } from "date-fns"
import Seo from "../components/seo"
import {
  ProfileContainer,
  DatabaseProfileContainer,
  RequestsContainer,
} from "../elements"

export const FirebaseProfile = props => {
  const [user, setUser] = useState([])

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user)
    })
  }, [user])

  const currentYear = new Date().getFullYear()
  const currentMonth = parseInt(new Date().getMonth())
  const currentDay = new Date().getDate()

  const dateFor10Hrs = () => {
    const result = addDays(
      new Date(currentYear, currentMonth, currentDay),
      props.daysUntil10Hrs
    )
    return `${parseInt(
      result.getMonth() + 1
    )}/${result.getDate()}/${result.getFullYear()}`
  }

  return (
    <>
      <Seo title={user ? `${props.firstName}'s Profile` : `Profile`} />
      <h1 style={{ textAlign: "center" }}>
        {user && props.firstName}'s Profile
      </h1>
      <ProfileContainer>
        <>
          <DatabaseProfileContainer>
            <h2>PTO Info</h2>
            <div className="highlights">
              <div className="highlight">
                <h3>
                  {props.remainingPTO > 0
                    ? `${props.remainingPTO}hrs`
                    : props.remainingPTO}
                </h3>
                <hr />
                <p>Remaining PTO</p>
              </div>
              <div className="highlight">
                <h3>
                  {props.daysUntil10Hrs !== "N/A"
                    ? `${props.daysUntil10Hrs} Days`
                    : props.daysUntil10Hrs}
                </h3>
                <hr />
                <p>
                  +10hrs on{" "}
                  {props.daysUntil10Hrs !== "N/A" ? dateFor10Hrs() : `Never`}
                </p>
              </div>
            </div>
            <div>
              <h2 className="special-h2">PTO Usage</h2>
              {props.pending && (
                <p>
                  Pending hours are NOT subtracted from remaining PTO. The
                  remaining hours are adjusted once the request is "Accepted".
                </p>
              )}
              <RequestsContainer>
                <div className="pending-requests requests">
                  <h3>Pending</h3>
                  {props.pending ? (
                    <ul>
                      {props.pending.map((request, index) =>
                        request.dates.length > 1 ? (
                          <li key={index}>
                            Pending: {request.dates[0]} to {request.dates[1]}{" "}
                            using {request.hours} hours.
                          </li>
                        ) : (
                          <li key={index}>
                            Pending: {request.dates} using {request.hours}{" "}
                            hours.
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p>No pending requests.</p>
                  )}
                </div>
                <div className="accepted-requests requests">
                  <h3>Accepted</h3>
                  {props.accepted ? (
                    <ul>
                      {props.accepted.map((request, index) =>
                        request.dates.length > 1 ? (
                          <li key={index}>
                            Accepted: {request.dates[0]} to {request.dates[1]}{" "}
                            using {request.hours} hours.
                          </li>
                        ) : (
                          <li key={index}>
                            Accepted: {request.dates} using {request.hours}{" "}
                            hours.
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p>
                      You haven't used any PTO. You might have some pending.
                    </p>
                  )}
                </div>
              </RequestsContainer>
            </div>
          </DatabaseProfileContainer>
          <DatabaseProfileContainer>
            <h2>More Info</h2>
            <div className="highlights">
              <div className="highlight">
                <h4>
                  <p>
                    {props.lifetimePTO >= 0
                      ? `${props.lifetimePTO}hrs`
                      : props.lifetimePTO}
                  </p>
                </h4>
                <hr />
                <p>Lifetime PTO</p>
              </div>
              <div className="highlight">
                <h4>
                  <p>{props.location}</p>
                </h4>
                <hr />
                <p>Location</p>
              </div>
              <div className="highlight">
                <h4>
                  <p>{props.hireDate}</p>
                </h4>
                <hr />
                <p>Hire Date - {props.monthsWorkedTotal} months ago</p>
              </div>
              <div className="highlight">
                <h4>
                  <p>{props.position}</p>
                </h4>
                <hr />
                <p>
                  Position -{" "}
                  {props.monthsWorkedAsPosition
                    ? props.monthsWorkedAsPosition
                    : props.monthsWorkedTotal}{" "}
                  months ago
                </p>
              </div>
            </div>
          </DatabaseProfileContainer>
        </>
      </ProfileContainer>
    </>
  )
}
