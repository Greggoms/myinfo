import React, { useState, useEffect } from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"
import { useForm } from "react-hook-form"
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

export const FirebaseProfile = () => {
  const [user, setUser] = useState()
  const [uid, setUid] = useState("")
  const [details, setDetails] = useState([])
  const [hasDocument, setHasDocument] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(null)
  const [hasHireDate, setHasHireDate] = useState(false)
  const { register, handleSubmit } = useForm()
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
        setDetails(docSnap.data())
        if (docSnap.data() === undefined) {
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

  useEffect(() => {
    if (
      details &&
      (details.position === undefined ||
        details.location === undefined ||
        details.hireDate === undefined)
    ) {
      setShowForm(true)
    } else {
      setShowForm(false)
    }
  }, [details])

  const onSubmit = async data => {
    try {
      // Update current user's document on Firestore
      await updateDoc(doc(db, `users/${uid}`), {
        position: `${data.position}`,
        location: `${data.location}`,
      })
      if (
        !isNaN(data.hireYear) &&
        !isNaN(data.hireMonth) &&
        !isNaN(data.hireDay)
      ) {
        await updateDoc(doc(db, `users/${uid}`), {
          hireDate: [data.hireYear, data.hireMonth, data.hireDay],
        })
      }
      setSubmitted(true)
      setSubmitted(null)
    } catch (err) {
      console.log("Error updating/reading document: ", err)
    }
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
            <DatabaseProfileContainer>
              {showForm && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="get-started">
                    <h3>Get Started on your Profile!</h3>
                  </div>
                  {!details.position && (
                    <label>
                      <div>
                        What is your position?{" "}
                        <span style={{ color: "#F25C69" }}>*</span>
                        <div className="tooltip">
                          ?
                          <span className="tooltiptext">
                            This is how I determine your eligibilty for raises.
                          </span>
                        </div>
                      </div>

                      <select
                        {...register("position")}
                        defaultValue="Associate"
                      >
                        <option value="Associate">Associate</option>
                        <option value="Assist Mngr">Assistant Manager</option>
                        <option value="Manager">Manager</option>
                      </select>
                    </label>
                  )}
                  {!details.location && (
                    <label>
                      <div>
                        Which location do you work at?{" "}
                        <span style={{ color: "#F25C69" }}>*</span>
                      </div>
                      <select
                        {...register("location")}
                        defaultValue="AR Jacksonville"
                      >
                        <option value="AR Jacksonville">AR Jacksonville</option>
                        <option value="AR Maumelle">AR Maumelle</option>
                        <option value="AR Otter Creek">AR Otter Creek</option>
                        <option value="AR Sherwood">AR Sherwood</option>
                        <option value="AR Texarkana">AR Texarkana</option>
                        <option value="AR University">AR University</option>
                        <option value="VW/AR Chenal Pkwy">
                          VW/AR Chenal Pkwy
                        </option>
                        <option value="VW Arkadelphia">VW Arkadelphia</option>
                        <option value="VW Benton">VW Benton</option>
                        <option value="VW Bryant">VW Bryant</option>
                        <option value="VW HS Albert Pike">
                          VW HS Albert Pike
                        </option>
                        <option value="VW HS Central Ave">
                          VW HS Central Ave
                        </option>
                        <option value="VW Jacksonville">VW Jacksonville</option>
                        <option value="VW North Little Rock">
                          VW North Little Rock
                        </option>
                        <option value="VW Rodney Parham">
                          VW Rodney Parham
                        </option>
                        <option value="Warehouse">Warehouse</option>
                      </select>
                    </label>
                  )}

                  {!hasHireDate && (
                    <>
                      <div className="special-div">
                        When were you hired?
                        <div className="tooltip">
                          ?
                          <span className="tooltiptext">
                            Filling this in results in the bulk of your profile
                            being populated. If you aren't sure then I'll fill
                            it in on my end.
                            <ul>
                              <li>Must be valid whole numbers.</li>
                              <li>Example: Hired on Feb 8th 2022</li>
                              <ul>
                                <li>Correct: 2022/2/8</li>
                                <li>Correct: 2022/02/08</li>
                              </ul>
                            </ul>
                          </span>
                        </div>
                      </div>
                      <div className="hire-date-inputs">
                        <label>
                          <span>Year</span>
                          <input
                            {...register("hireYear", {
                              minLength: 4,
                              maxLength: 4,
                              valueAsNumber: true,
                            })}
                            placeholder="2022"
                            type="number"
                          />
                        </label>
                        <label>
                          <span>Month</span>
                          <input
                            {...register("hireMonth", {
                              valueAsNumber: true,
                            })}
                            placeholder="1, 9, 12 etc..."
                            type="number"
                            min={1}
                            max={12}
                          />
                        </label>
                        <label>
                          <span>Day</span>
                          <input
                            {...register("hireDay", {
                              valueAsNumber: true,
                            })}
                            placeholder="1, 15, 31 etc..."
                            type="number"
                            min={1}
                            max={31}
                          />
                        </label>
                      </div>
                    </>
                  )}

                  <input type="submit" value="Submit" className="submit-btn" />
                </form>
              )}
              <h2>PTO Info</h2>
              <div className="highlights">
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
                  {details.location ? (
                    <h4>{details.location && details.location}</h4>
                  ) : (
                    <p>Waiting...</p>
                  )}
                  <hr />
                  <p>Location</p>
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
