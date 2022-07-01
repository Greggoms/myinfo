import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectUserFireDoc, addPtoRequest } from "../app/features/userSlice"
import { doc, updateDoc, arrayUnion } from "firebase/firestore"
import { db } from "../firebase/firebaseInit"

import { format } from "date-fns"
import DateRangePicker from "@wojtekmaj/react-daterange-picker"
import emailjs, { init } from "@emailjs/browser"
import { toast } from "react-toastify"
import { remainingPTO } from "../data/dateHelpers"

import { PtoRequestFormContainer } from "../css"
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css"
import "react-calendar/dist/Calendar.css"

const PtoRequestForm = () => {
  const [dateRangeValue, onChange] = useState([new Date(), new Date()])
  const [requestHours, setRequestHours] = useState(0)

  const dispatch = useDispatch()
  const userDoc = useSelector(selectUserFireDoc)

  const handlePtoRequest = async () => {
    try {
      if (requestHours <= 0) {
        toast.error(`You must use more than 0 hours on a request.`)
      } else if (
        requestHours >
        remainingPTO(
          userDoc.hireDate.split("/")[2],
          userDoc.hireDate.split("/")[0],
          userDoc.hireDate.split("/")[1],
          userDoc.hoursUsed ? userDoc.hoursUsed : 0,
          userDoc.pending ? userDoc.pending : null
        )
      ) {
        toast.error(`You don't have enough hours for this request.`)
      } else if (requestHours > 40) {
        toast.error(`You can't use more than 40 hours per request.`)
      } else {
        init(`${process.env.GATSBY_EMAILJS_PUBLIC_KEY}`)
        // These values can be used in the email template settings
        const templateParams = {
          name: userDoc.name,
          email: userDoc.email,
          begin: format(dateRangeValue[0], `P`),
          end: format(dateRangeValue[1], `P`),
          requestHours,
        }
        // Send the email
        // await emailjs.send(
        //   `${process.env.GATSBY_PAYROLL_EMAILJS_SERVICE_ID}`,
        //   `${process.env.GATSBY_PTO_EMAILJS_TEMPLATE_ID}`,
        //   templateParams,
        //   `${process.env.GATSBY_EMAILJS_PUBLIC_KEY}`
        // )
        if (format(dateRangeValue[0], `P`) === format(dateRangeValue[1], `P`)) {
          async function modifyUser() {
            const userRef = doc(db, "users", userDoc.id)
            await updateDoc(userRef, {
              submitted: arrayUnion({
                dates: format(dateRangeValue[0], `P`),
                hours: requestHours,
              }),
            })
          }
          modifyUser()
          dispatch(
            addPtoRequest({
              dates: format(dateRangeValue[0], `P`),
              hours: requestHours,
            })
          )
          toast.info(() => (
            <>
              <h3>Request Submitted!</h3>
              <p>
                {format(dateRangeValue[0], `P`)} using {requestHours} hours.
              </p>
            </>
          ))
        } else {
          async function modifyUser() {
            const userRef = doc(db, "users", userDoc.id)
            await updateDoc(userRef, {
              submitted: arrayUnion({
                dates: [
                  format(dateRangeValue[0], `P`),
                  format(dateRangeValue[1], `P`),
                ],
                hours: requestHours,
              }),
            })
          }
          modifyUser()
          dispatch(
            addPtoRequest({
              dates: [
                format(dateRangeValue[0], `P`),
                format(dateRangeValue[1], `P`),
              ],
              hours: requestHours,
            })
          )
          toast.info(() => {
            return (
              <>
                <h3>Request Submitted!</h3>
                <p>
                  {format(dateRangeValue[0], `P`)} to{" "}
                  {format(dateRangeValue[1], `P`)} using {requestHours} hours.
                </p>
              </>
            )
          })
        }
        setRequestHours(0)
      }
    } catch (e) {
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
      <h2>Make a PTO Request</h2>
      <div className="label">
        <span>Dates:</span>
        <DateRangePicker onChange={onChange} value={dateRangeValue} />
      </div>
      <div className="label">
        <span>
          Hours:{" "}
          {remainingPTO(
            userDoc.hireDate.split("/")[2],
            userDoc.hireDate.split("/")[0],
            userDoc.hireDate.split("/")[1],
            userDoc.hoursUsed ? userDoc.hoursUsed : 0,
            userDoc.pending ? userDoc.pending : null
          )}{" "}
          Hours Remaining
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
    </PtoRequestFormContainer>
  )
}

export default PtoRequestForm
