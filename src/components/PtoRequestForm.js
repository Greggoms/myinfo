import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectUserFireDoc, addPtoRequest } from "../app/features/userSlice"
import { doc, updateDoc, arrayUnion } from "firebase/firestore"
import { db } from "../firebase/firebaseInit"

import { v4 as uuid } from "uuid"
import emailjs, { init } from "@emailjs/browser"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
import { remainingPTO } from "../data/dateHelpers"

import { PtoRequestFormContainer } from "../css"

const PtoRequestForm = () => {
  const [beginDate, setBeginDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [requestHours, setRequestHours] = useState(0)
  const [formHelp, setFormHelp] = useState(false)

  const dispatch = useDispatch()
  const userDoc = useSelector(selectUserFireDoc)

  const handlePtoRequest = async () => {
    try {
      // Error Handling
      if (requestHours <= 0) {
        toast.error(`You must use more than 0 hours on a request.`)
      } else if (
        requestHours >
        remainingPTO(
          userDoc.hireDate.split("-")[0],
          userDoc.hireDate.split("-")[1],
          userDoc.hireDate.split("-")[2],
          userDoc.hoursUsed ? userDoc.hoursUsed : 0,
          userDoc.pending ? userDoc.pending : null
        )
      ) {
        toast.error(`You don't have enough hours for this request.`)
      } else if (requestHours > 40) {
        toast.error(`You can't use more than 40 hours per request.`)
      } else {
        // No errors? Send an email update and update the UserFireDoc
        init(`${process.env.GATSBY_EMAILJS_PUBLIC_KEY}`)
        // These values can be used in the email template settings
        const templateParams = {
          name: userDoc.name,
          email: userDoc.email,
          dates:
            beginDate === endDate ? beginDate : `${beginDate} to ${endDate}`,
          requestHours,
        }

        // Send the email
        await emailjs.send(
          `${process.env.GATSBY_PAYROLL_EMAILJS_SERVICE_ID}`,
          `${process.env.GATSBY_PTO_EMAILJS_TEMPLATE_ID}`,
          templateParams,
          `${process.env.GATSBY_EMAILJS_PUBLIC_KEY}`
        )

        async function updateUser() {
          const userRef = doc(db, "users", userDoc.id)
          await updateDoc(userRef, {
            // Update fields in nested objects
            // https://firebase.google.com/docs/firestore/manage-data/add-data
            "pto.submitted": arrayUnion({
              id: uuid(),
              dates:
                beginDate === endDate || endDate === ""
                  ? beginDate
                  : [beginDate, endDate],
              hours: requestHours,
            }),
          })
        }
        updateUser()
        // update redux store
        dispatch(
          addPtoRequest({
            id: userDoc.id,
            request: {
              id: uuid(),
              dates:
                beginDate === endDate || endDate === ""
                  ? beginDate
                  : [beginDate, endDate],
              hours: requestHours,
            },
          })
        )
        // update UI
        toast.info(() => (
          <>
            <h3>Request Submitted!</h3>
            <p>StoreOps will review your request shortly.</p>
            {beginDate === endDate || endDate === "" ? (
              <p>
                {beginDate} using {requestHours} hours.
              </p>
            ) : (
              <p>
                {beginDate} to {endDate} using {requestHours} hours.
              </p>
            )}
          </>
        ))
      }
      setRequestHours(0)
    } catch (e) {
      console.log(e)
      toast.error(() => (
        <>
          <h3>Something went wrong</h3>
          <p>Make sure your request is valid!</p>
          <p>
            Error Message: <em style={{ color: "#F23D3D" }}>{e.message}</em>
          </p>
        </>
      ))
    }
  }

  return (
    <PtoRequestFormContainer>
      <div className="form-heading">
        <h2>Make a PTO Request</h2>
        <FontAwesomeIcon
          icon={faCircleQuestion}
          onClick={() => setFormHelp(!formHelp)}
        />
      </div>
      <div className="label">
        <span>Dates:</span>
        <div className="dates">
          <div>
            <input
              type="date"
              value={beginDate}
              onChange={e => setBeginDate(e.target.value)}
            />
          </div>
          <p>to</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
            <span>(optional)</span>
          </div>
        </div>
      </div>
      <div className="label">
        <span>
          Hours:{" "}
          {userDoc.hireDate
            ? `${remainingPTO(
                userDoc.hireDate.split("-")[0],
                userDoc.hireDate.split("-")[1],
                userDoc.hireDate.split("-")[2],
                userDoc.hoursUsed ? userDoc.hoursUsed : 0,
                userDoc.pending ? userDoc.pending : null
              )} remaining`
            : " No hire date!"}
        </span>
        <div className="hour-container">
          <p>{requestHours}</p>
          <div className="hour-buttons">
            <button onClick={() => setRequestHours(requestHours - 4)}>-</button>
            <button onClick={() => setRequestHours(requestHours + 4)}>+</button>
          </div>
        </div>
      </div>
      <button type="submit" onClick={handlePtoRequest}>
        Submit Request
      </button>
      {formHelp && (
        <div className="form-help">
          <div className="help">
            <h2>PTO Request Rules</h2>
            <ul>
              <li>Must have enough available hours to cover the request.</li>
              <li>Requests must be in 4 hour increments.</li>
              <li>Must use at least 4 hours.</li>
              <li>Cannot request more than 40 hours at once.</li>
            </ul>
          </div>
          {/* eslint-disable-next-line */}
          <div className="overlay" onClick={() => setFormHelp(false)} />
        </div>
      )}
    </PtoRequestFormContainer>
  )
}

export default PtoRequestForm
