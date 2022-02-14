import React, { useState, useEffect } from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getFirestore, doc, getDoc } from "firebase/firestore"
import {
  addDays,
  differenceInCalendarDays,
  differenceInCalendarMonths,
} from "date-fns"
import Seo from "../components/seo"
import {
  ProfileContainer,
  DatabaseProfileContainer,
  RequestsContainer,
} from "../elements"
import { ProfileForm } from "./ProfileForm"

export const FirebaseProfile = () => {
  const [user, setUser] = useState()
  const [uid, setUid] = useState("")
  const [details, setDetails] = useState([])
  const [hasDocument, setHasDocument] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [hasHireDate, setHasHireDate] = useState(false)

  const db = getFirestore()

  useEffect(() => {
    let isMounted = true
    firebase.auth().onAuthStateChanged(user => {
      if (user && isMounted) {
        setUser(user)
        setUid(user.uid)
      } else {
        setUser(null)
        setUid(null)
      }
    })
    return () => {
      isMounted = false
    }
  }, [user])

  useEffect(() => {
    try {
      const docRef = doc(db, `users/${uid}`)
      async function getUserDetails() {
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setDetails(docSnap.data())
        } else {
          setHasDocument(false)
        }
      }
      getUserDetails()
    } catch {
      console.log(
        "Re-running useEffect to fill a previously undefined variable"
      )
    }
    // eslint-disable-next-line
  }, [uid, submitted])

  useEffect(() => {
    if (
      details &&
      details.hireDate !== undefined &&
      !isNaN(details.hireDate[0]) &&
      !isNaN(details.hireDate[1]) &&
      !isNaN(details.hireDate[2])
    ) {
      setHasHireDate(true)
    }
  }, [details])

  const handleFormSubmitted = () => {
    setSubmitted(!submitted)
    setShowForm(false)
  }

  const currentYear = new Date().getFullYear()
  const currentMonth = parseInt(new Date().getMonth() + 1)
  const currentDay = new Date().getDate()

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

  const daysUntil10Hrs = (hireYear, hireMonth, hireDay) => {
    const result = differenceInCalendarDays(
      new Date(currentYear, currentMonth, currentDay),
      new Date(hireYear, hireMonth, hireDay)
    )
    return 91 - (result % 91)
  }

  const dateFor10Hrs = (hireYear, hireMonth, hireDay) => {
    const result = addDays(
      new Date(currentYear, currentMonth, currentDay),
      daysUntil10Hrs(hireYear, hireMonth, hireDay)
    )
    return `${parseInt(
      result.getMonth()
    )}/${result.getDate()}/${result.getFullYear()}`
  }

  const lifetimePTO = (hireYear, hireMonth, hireDay) => {
    const result = differenceInCalendarDays(
      new Date(currentYear, currentMonth, currentDay),
      new Date(hireYear, hireMonth, hireDay)
    )
    return Math.floor(result / 91) * 10
  }

  const monthsWorked = (year, month, day) => {
    const result = differenceInCalendarMonths(
      new Date(currentYear, currentMonth, currentDay),
      new Date(year, month, day)
    )
    return result
  }

  if (details && hasDocument) {
    return (
      <>
        <Seo
          title={
            user && user.displayName
              ? `${user.displayName}'s Profile`
              : `Profile`
          }
        />
        <ProfileContainer>
          <>
            <button
              className="toggle-form-btn"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Hide" : "Show"} Form
            </button>
            <DatabaseProfileContainer>
              {showForm && (
                <ProfileForm
                  uid={uid}
                  details={details}
                  handleFormSubmitted={handleFormSubmitted}
                />
              )}

              <h2>PTO Info</h2>
              <div className="highlights main-highlights">
                <div className="highlight">
                  {hasHireDate ? (
                    <h3>
                      {remainingPTO(
                        details.hireDate[0],
                        details.hireDate[1],
                        details.hireDate[2],
                        details.hoursUsed ? details.hoursUsed : 0,
                        details.pending ? details.pending : 0
                      )}
                      hrs
                    </h3>
                  ) : (
                    <p>Waiting...</p>
                  )}
                  <hr />
                  <p>Remaining PTO</p>
                </div>
                <div className="highlight">
                  {hasHireDate ? (
                    <h3>
                      {daysUntil10Hrs(
                        details.hireDate[0],
                        details.hireDate[1],
                        details.hireDate[2]
                      )}{" "}
                      Days
                    </h3>
                  ) : (
                    <p>Waiting...</p>
                  )}
                  <hr />
                  {hasHireDate ? (
                    <p>
                      +10hrs on{" "}
                      {dateFor10Hrs(
                        details.hireDate[0],
                        details.hireDate[1],
                        details.hireDate[2]
                      )}
                    </p>
                  ) : (
                    <p>+10hrs on ???</p>
                  )}
                </div>
              </div>
              <div>
                <h2 className="special-h2">PTO Usage</h2>
                {details.pending ? (
                  <p>
                    Pending hours are NOT subtracted from remaining PTO. The
                    remaining hours are adjusted once the request is "Accepted".
                  </p>
                ) : null}
                <RequestsContainer>
                  <div className="pending-requests requests">
                    <h3>Pending</h3>
                    {details.pending ? (
                      <ul>
                        {details.pending.map((request, index) =>
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
                    {details.accepted ? (
                      <ul>
                        {details.accepted.map((request, index) =>
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
                  {details.location ? (
                    <h4>{details.location && details.location}</h4>
                  ) : (
                    <p>Waiting...</p>
                  )}
                  <hr />
                  <p>Location</p>
                </div>
                <div className="highlight">
                  {details.position ? (
                    <h4>{details.position}</h4>
                  ) : (
                    <p>Waiting...</p>
                  )}
                  <hr />
                  <p>
                    Position -{" "}
                    {details.promotionDate
                      ? monthsWorked(
                          details.promotionDate[0],
                          details.promotionDate[1],
                          details.promotionDate[2]
                        )
                      : hasHireDate
                      ? monthsWorked(
                          details.hireDate[0],
                          details.hireDate[1],
                          details.hireDate[2]
                        )
                      : "???"}{" "}
                    months
                  </p>
                </div>
                <div className="highlight">
                  {hasHireDate ? (
                    <h4>
                      {details.hireDate[1]}/{details.hireDate[2]}/
                      {details.hireDate[0]}
                    </h4>
                  ) : (
                    <p>Waiting...</p>
                  )}
                  <hr />
                  <p>
                    Hire Date -{" "}
                    {hasHireDate
                      ? monthsWorked(
                          details.hireDate[0],
                          details.hireDate[1],
                          details.hireDate[2]
                        )
                      : "???"}{" "}
                    months ago
                  </p>
                </div>
                <div className="highlight">
                  {hasHireDate ? (
                    <h4>
                      {lifetimePTO(
                        details.hireDate[0],
                        details.hireDate[1],
                        details.hireDate[2]
                      )}
                      hrs
                    </h4>
                  ) : (
                    <p>Waiting...</p>
                  )}
                  <hr />
                  <p>Lifetime PTO</p>
                </div>

                <div className="highlight">
                  <h4>Insurance</h4>
                  <hr />
                  <p>
                    {details.insurance
                      ? "Yes"
                      : hasHireDate &&
                        monthsWorked(
                          details.hireDate[0],
                          details.hireDate[1],
                          details.hireDate[2]
                        ) < 3
                      ? "Not eligible yet"
                      : "No"}
                  </p>
                </div>
              </div>
            </DatabaseProfileContainer>
          </>
        </ProfileContainer>
      </>
    )
  } else {
    return (
      <div
        style={{
          margin: "0 auto",
          maxWidth: "500px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          Your profile has been removed
        </h2>
        <p style={{ textAlign: "left" }}>
          Email or DM me if you're seeing this message. Fix this by logging out
          and logging back in. You will have to start your profile over.
        </p>
      </div>
    )
  }
}
