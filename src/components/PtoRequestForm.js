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
  const [ptoType, setPtoType] = useState("")
  const [formHelp, setFormHelp] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const dispatch = useDispatch()
  const userDoc = useSelector(selectUserFireDoc)

  const handleSetPtoType = e => {
    switch (e.target.value) {
      case "cashout":
        setPtoType("Cash Out")
        break
      case "missinghours":
        setPtoType("Missing Hours")
        break
      default:
        break
    }
  }

  const clearPtoRequest = () => {
    setBeginDate("")
    setEndDate("")
    setRequestHours(0)
    setPtoType("")
  }

  const handlePtoRequest = async () => {
    try {
      setSubmitting(true)
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
      } else if (beginDate === "") {
        toast.error(`You must choose a beginning date for this PTO request.`)
      } else if (ptoType === "") {
        toast.error(`Please choose the type of PTO Request.`)
      } else {
        // No errors? Send an email update and update the UserFireDoc
        init(`${process.env.GATSBY_EMAILJS_PUBLIC_KEY}`)
        // These values can be used in the email template settings
        const templateParams = {
          name: userDoc.name,
          email: userDoc.email,
          dates:
            beginDate === endDate || endDate === ""
              ? beginDate
              : `${beginDate} to ${endDate}`,
          requestHours,
          ptoType,
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
              type: ptoType,
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
              type: ptoType,
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
        setRequestHours(0)
        setBeginDate("")
        setEndDate("")
      }
      setSubmitting(false)
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
        <h2>{submitting ? `Submitting Request...` : `Make a PTO Request`}</h2>
        <FontAwesomeIcon
          icon={faCircleQuestion}
          onClick={() => setFormHelp(!formHelp)}
        />
      </div>
      <div className="label">
        <span>Date(s):</span>
        <div className="dates">
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <input
              type="date"
              value={beginDate}
              onChange={e => setBeginDate(e.target.value)}
            />
            <span>Begin - (required)</span>
          </div>
          <p>to</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              min={beginDate}
              disabled={beginDate === ""}
            />
            <span>End - (optional)</span>
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
          <p>
            {requestHours} {requestHours > 0 && `hours`}
          </p>
          <div className="hour-buttons">
            <button onClick={() => setRequestHours(requestHours - 4)}>-</button>
            <button onClick={() => setRequestHours(requestHours + 4)}>+</button>
          </div>
        </div>
      </div>

      <div className="radios">
        <h3>Specify request type</h3>
        <label>
          <input
            type="radio"
            value="cashout"
            name="cashout"
            checked={ptoType === "Cash Out"}
            onChange={handleSetPtoType}
          />
          <span>Cash Out - I haven't missed any work</span>
        </label>
        <label>
          <input
            type="radio"
            value="missinghours"
            name="missinghours"
            checked={ptoType === "Missing Hours"}
            onChange={handleSetPtoType}
          />
          <span>Missing Hours - I missed work and need to cover the hours</span>
        </label>
        {ptoType === "Cash Out" && (
          <p>
            Cashing out PTO may push you into a higher tax bracket{" "}
            <strong>if you are NOT missing hours</strong>. This would increase
            the taxes taken from your check.
          </p>
        )}
      </div>

      <div className="request-buttons">
        <button type="submit" onClick={handlePtoRequest}>
          Submit Request
        </button>
        <button onClick={clearPtoRequest} className="reset">
          Reset Form
        </button>
      </div>
      {formHelp && (
        <div className="form-help">
          <div className="help">
            <button onClick={() => setFormHelp(false)}>X</button>
            <h2>PTO Request Rules</h2>
            <ul>
              <li>Must have enough available hours to cover the request.</li>
              <li>Requests must be in 4 hour increments.</li>
              <li>Must use at least 4 hours.</li>
              <li>Cannot request more than 40 hours at once.</li>
              <li>Must specify the request type.</li>
            </ul>
            <h2 style={{ marginTop: "10px" }}>Specifying Request Type</h2>
            <ul>
              <li>Cash Out</li>
              <ul>
                <li>
                  This option tells payroll that you would like to cash out the
                  requested hours even if you havent missed any work.
                </li>
              </ul>
              <li>Missing Hours</li>
              <ul>
                <li>
                  This option informs payroll that you have missed work and
                  would like to use PTO to make up those missed hours.
                </li>
              </ul>
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
