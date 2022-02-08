import React, { useState, useEffect } from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"
import { useForm } from "react-hook-form"
import { addDays } from "date-fns"
import Seo from "../components/seo"
import {
  ProfileContainer,
  DatabaseProfileContainer,
  RequestsContainer,
} from "../elements"

export const FirebaseProfile = props => {
  const [user, setUser] = useState([])
  const [uid, setUid] = useState("")
  const [details, setDetails] = useState([])
  const [submitted, setSubmitted] = useState(null)
  const { register, handleSubmit } = useForm()
  const db = getFirestore()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user)
      setUid(user.uid)
    })
  }, [user])

  useEffect(() => {
    try {
      const docRef = doc(db, `users/${uid}`)
      async function getUserDetails() {
        const docSnap = await getDoc(docRef)
        setDetails(docSnap.data())
      }
      getUserDetails()
    } catch {
      console.log(
        "Re-running useEffect to fill a previously undefined variable"
      )
    }
  }, [uid, submitted])

  const onSubmit = async data => {
    try {
      console.log(data)
      // Update current user's document on Firestore
      await updateDoc(doc(db, `users/${uid}`), {
        position: `${data.position}`,
        location: `${data.location}`,
      })
      setSubmitted(true)
      setSubmitted(null)
    } catch (err) {
      console.log("Error updating/reading document: ", err)
    }
  }

  // const currentYear = new Date().getFullYear()
  // const currentMonth = parseInt(new Date().getMonth())
  // const currentDay = new Date().getDate()

  // const dateFor10Hrs = () => {
  //   const result = addDays(
  //     new Date(currentYear, currentMonth, currentDay),
  //     props.daysUntil10Hrs
  //   )
  //   return `${parseInt(
  //     result.getMonth() + 1
  //   )}/${result.getDate()}/${result.getFullYear()}`
  // }

  // console.log(watch("example")) // watch input value by passing the name of it

  return (
    <>
      <Seo
        title={
          user && user.displayName ? `${user.displayName}'s Profile` : `Profile`
        }
      />
      <ProfileContainer>
        <>
          <DatabaseProfileContainer>
            {submitted === null && !details.position && !details.location && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Get Started on your Profile!</h3>
                {!details.position && (
                  <label>
                    What is your position?
                    <select {...register("position")} defaultValue="Associate">
                      <option value="Associate">Associate</option>
                      <option value="Assist Mngr">Assistant Manager</option>
                      <option value="Manager">Manager</option>
                    </select>
                  </label>
                )}
                {!details.location && (
                  <label>
                    Which location do you work at?
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
                      <option value="VW Rodney Parham">VW Rodney Parham</option>
                      <option value="Warehouse">Warehouse</option>
                    </select>
                  </label>
                )}

                <input type="submit" value="Submit" />
              </form>
            )}
            {/* <h2>PTO Info</h2>
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
          <DatabaseProfileContainer>*/}
            <h2>More Info</h2>
            <div className="highlights">
              {/* <div className="highlight">
                <h4>
                  <p>
                    {props.lifetimePTO >= 0
                      ? `${props.lifetimePTO}hrs`
                      : props.lifetimePTO}
                  </p>
                </h4>
                <hr />
                <p>Lifetime PTO</p>
              </div> */}
              <div className="highlight">
                {details.location ? (
                  <h4>{details.location && details.location}</h4>
                ) : (
                  <p>Waiting...</p>
                )}
                <hr />
                <p>Location</p>
              </div>
              {/* <div className="highlight">
                <h4>
                  <p>{props.hireDate}</p>
                </h4>
                <hr />
                <p>Hire Date - {props.monthsWorkedTotal} months ago</p>
              </div> */}
              <div className="highlight">
                {details.position ? (
                  <h4>{details.position}</h4>
                ) : (
                  <p>Waiting...</p>
                )}
                <hr />
                <p>
                  Position -{" "}
                  {/*props.monthsWorkedAsPosition
                    ? props.monthsWorkedAsPosition
                  : props.monthsWorkedTotal*/}{" "}
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
