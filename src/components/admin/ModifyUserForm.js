import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateUser } from "../../app/features/usersSlice"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseInit"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import emailjs, { init } from "@emailjs/browser"
import DatePicker from "react-date-picker"

import { locations } from "../../data/locations"
import { positions } from "../../data/positions"
import { toastifyFailed, toastifyInfo } from "../toasts"
import { ModifyUserButton, ModifyUserContainer } from "../../css"

export const ModifyUserForm = props => {
  const dispatch = useDispatch()

  const users = useSelector(state => state.users.value)

  const {
    id,
    name,
    hireDate,
    insurance,
    lastRaise,
    location,
    pay,
    pending,
    position,
    promotionDate,
  } = users.find(user => user.id === props.id)

  const [modifyUser, setModifyUser] = useState(false)
  const [newHireDate, onHireChange] = useState()
  const [newPromotionDate, onPromotionChange] = useState()
  const [newRaiseDate, onRaiseChange] = useState()

  const { register, handleSubmit } = useForm()

  const onSubmit = async data => {
    try {
      if (
        data.name === "" &&
        data.pay === "" &&
        newHireDate === undefined &&
        newPromotionDate === undefined &&
        newRaiseDate === undefined
      ) {
        toastifyFailed(`You need to make at least 1 change before submitting`)
      } else {
        init(`${process.env.GATSBY_EMAILJS_PUBLIC_KEY}`)
        const { newName, newLocation, newPosition, newPay, newInsurance } = data
        // These values can be used in the email template settings
        const templateParams = {
          name,
          location,
          position,
          pay,
          insurance,
          hireDate,
          promotionDate,
          lastRaise,
          newName,
          newLocation,
          newPosition,
          newPay,
          newInsurance,
          newHireDate: format(newHireDate, `P`),
          newPromotionDate: format(newPromotionDate, `P`),
          newRaiseDate: format(newRaiseDate, `P`),
        }
        // Send the email
        // await emailjs.send(
        //   `${process.env.GATSBY_PAYROLL_EMAILJS_SERVICE_ID}`,
        //   `${process.env.GATSBY_PAYROLL_EMAILJS_TEMPLATE_ID}`,
        //   templateParams,
        //   `${process.env.GATSBY_EMAILJS_PUBLIC_KEY}`
        // )
        if (
          data.newName === name &&
          data.newLocation === location &&
          data.newPosition === position &&
          parseFloat(data.newPay) === pay &&
          data.newInsurance === insurance &&
          format(newHireDate, `P`) === hireDate &&
          format(newPromotionDate, `P`) === promotionDate &&
          format(newRaiseDate, `P`) === lastRaise
        ) {
          return toastifyFailed("No values were changed")
        } else {
          return toastifyInfo(<h2>{data.newName} Updated!</h2>)
        }
        // dispatch(updateUser({ id: id, info: data }))

        // async function modifyUser() {
        //   const userRef = doc(db, "users", id)
        //   await updateDoc(userRef, {
        //     name: data.newName,
        //     insurance: data.newInsurance === "true" ? "OPT-IN" : "OPT-OUT",
        //     location: data.newLocation,
        //     position: data.newPosition,
        //     pay: parseFloat(data.newPay),
        //     hireDate: format(newHireDate, `P`),
        //     promotionDate: format(newPromotionDate, `P`),
        //     lastRaise: format(newRaiseDate, `P`),
        //   })
        // }
        // modifyUser()
      }
    } catch (err) {
      toastifyFailed(err.message)
      console.log("Error! ->", err)
    }
  }

  return (
    <>
      <ModifyUserButton type="button" onClick={() => setModifyUser(true)}>
        Modify
      </ModifyUserButton>
      {modifyUser && (
        <ModifyUserContainer>
          <button className="modify-close" onClick={() => setModifyUser(false)}>
            Cancel
          </button>
          <form className="modify-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Updating {name}...</h2>
            <div className="label">
              <span>Full Name:</span>
              <input
                placeholder={`(current): ${name}`}
                defaultValue={name}
                type="text"
                {...register("newName")}
              />
            </div>
            <div className="label">
              <span>Location:</span>
              <select {...register("newLocation")}>
                {location ? (
                  <option value={location}>(current): {location}</option>
                ) : (
                  <option value="">Select a Location</option>
                )}
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            <div className="label">
              <span>Position:</span>
              <select {...register("newPosition")}>
                {position ? (
                  <option value={position}>(current): {position}</option>
                ) : (
                  <option value="">Select a Position</option>
                )}
                {positions.map(position => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </div>
            <div className="label">
              <span>Pay Rate:</span>
              {pay ? (
                <input
                  type="number"
                  inputMode="numeric"
                  step="0.01"
                  placeholder={`(current): $${pay}`}
                  defaultValue={pay}
                  {...register("newPay")}
                />
              ) : (
                <input
                  type="number"
                  inputMode="numeric"
                  step="0.01"
                  placeholder="Pay Rate?"
                  {...register("newPay")}
                />
              )}
            </div>
            <div className="label">
              <span>Insurance</span>
              <select
                {...register("newInsurance", {
                  setValueAs: v => Boolean(v),
                })}
              >
                {insurance === true ? (
                  <option value={true}>(current): Opt-IN</option>
                ) : (
                  <option value="">(current): Opt-OUT</option>
                )}
                <option value="">Opt-OUT</option>
                <option value={true}>Opt-IN</option>
              </select>
            </div>
            <div className="label">
              <span>Hire Date:</span>
              <DatePicker
                onChange={onHireChange}
                value={newHireDate}
                calendarClassName="date-picker"
                clearIcon={null}
              />
            </div>
            <div className="label">
              <span>Promotion Date:</span>
              <DatePicker
                onChange={onPromotionChange}
                value={newPromotionDate}
                calendarClassName="date-picker"
                clearIcon={null}
              />
            </div>
            <div className="label">
              <span>Last Raise Date:</span>
              <DatePicker
                onChange={onRaiseChange}
                value={newRaiseDate}
                calendarClassName="date-picker"
                clearIcon={null}
              />
            </div>

            <input
              type="submit"
              value="Save Changes"
              className="submit-btn"
              style={{
                cursor: "pointer",
              }}
            />
          </form>
        </ModifyUserContainer>
      )}
    </>
  )
}
