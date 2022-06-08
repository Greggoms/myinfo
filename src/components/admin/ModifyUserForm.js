import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseInit"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import DatePicker from "react-date-picker"

import { locations } from "../../data/locations"
import { positions } from "../../data/positions"
import { toastifyFailed, toastifyInfo } from "../toasts"
import { ModifyUserButton, ModifyUserContainer } from "../../css"

export const ModifyUserForm = props => {
  const users = useSelector(state => state.users.value)
  const {
    id,
    name,
    accepted,
    hireDate,
    hoursUsed,
    insurance,
    lastRaise,
    location,
    pay,
    pending,
    position,
    promotionDate,
  } = users.find(user => user.id === props.id)

  const [modifyUser, setModifyUser] = useState(false)
  const [hireDateValue, onHireChange] = useState()
  const [promotionDateValue, onPromotionChange] = useState()
  const [raiseDateValue, onRaiseChange] = useState()

  useEffect(() => {
    if (hireDate) {
      const splitHireDate = hireDate.split("/")
      onHireChange(
        new Date(splitHireDate[2], splitHireDate[0] - 1, splitHireDate[1])
      )
    } else {
      onHireChange(new Date())
    }
  }, [hireDate])
  useEffect(() => {
    if (promotionDate) {
      const splitPromotionDate = promotionDate.split("/")
      onPromotionChange(
        new Date(
          splitPromotionDate[2],
          splitPromotionDate[0] - 1,
          splitPromotionDate[1]
        )
      )
    } else {
      onPromotionChange(new Date())
    }
  }, [promotionDate])
  useEffect(() => {
    if (lastRaise) {
      const splitRaiseDate = lastRaise.split("/")
      onRaiseChange(
        new Date(splitRaiseDate[2], splitRaiseDate[0] - 1, splitRaiseDate[1])
      )
    } else {
      onRaiseChange(new Date())
    }
  }, [lastRaise])

  const { register, handleSubmit } = useForm()

  const onSubmit = data => {
    try {
      if (
        data.name === "" &&
        data.pay === "" &&
        hireDateValue === undefined &&
        promotionDateValue === undefined &&
        raiseDateValue === undefined
      ) {
        toastifyFailed(`You need to make at least 1 change before submitting`)
      } else {
        toastifyInfo(() => (
          <>
            <h2>{data.name !== "" ? data.name : name} Updated!</h2>
            {data.name !== "" && (
              <p>
                Full Name: <s>{name}</s> to {data.name}
              </p>
            )}
            <p>
              Location: <s>{location}</s> to {data.location}
            </p>
            <p>
              Position: <s>{position}</s> to {data.position}
            </p>
            {data.pay !== "" && (
              <p>
                Pay Rate: <s>{pay}</s> to {data.pay}
              </p>
            )}
            <p>
              Insurance: <s>{insurance ? `Opt-IN` : `Opt-OUT`}</s> to{" "}
              {data.insurance ? `Opt-IN` : `Opt-OUT`}
            </p>
            {hireDateValue && (
              <p>
                Hire Date: <s>{hireDate ? hireDate : `No Hire Date`}</s> to{" "}
                {format(hireDateValue, `P`)}
              </p>
            )}
            {promotionDateValue && (
              <p>
                Promotion Date:{" "}
                <s>{promotionDate ? promotionDate : `No Promotion Date`} </s> to{" "}
                {format(promotionDateValue, `P`)}
              </p>
            )}
            {raiseDateValue && (
              <p>
                Last Raise:
                <s>{lastRaise ? lastRaise : `No Previous Raise`}</s> to{" "}
                {format(raiseDateValue, `P`)}
              </p>
            )}
          </>
        ))
        // async function updateUser() {
        //   const userRef = doc(db, "users", id)
        //   await updateDoc(userRef, data, {
        //     hireDate: format(hireDateValue, `P`),
        //     promotionDate: format(promotionDateValue, `P`),
        //     lastRaise: format(raiseDateValue, `P`),
        //   })
        // }
        // updateUser()
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
            Close
          </button>
          <div className="modify-current">
            <h2>Current</h2>
            <div className="list">
              <label>
                <span>Accepted PTO:</span>
                <p>
                  {accepted
                    ? `${accepted.length} accepted requests`
                    : "No accepted requests"}
                </p>
              </label>
              <label>
                <span>Pending PTO:</span>
                <p>
                  {pending
                    ? `${pending.length} pending requests`
                    : "No pending requests"}
                </p>
              </label>
              <label>
                <span>Hours Used:</span>
                <p>{hoursUsed} hours used</p>
              </label>
            </div>
          </div>
          <form className="modify-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Updated</h2>
            <div className="label">
              <span>Full Name:</span>
              <input
                placeholder={`(current): ${name}`}
                defaultValue={name}
                type="text"
                {...register("name")}
              />
            </div>
            <div className="label">
              <span>Location:</span>
              <select {...register("location")}>
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
              <select {...register("position")}>
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
                  {...register("pay")}
                />
              ) : (
                <input
                  type="number"
                  inputMode="numeric"
                  step="0.01"
                  placeholder="Pay Rate?"
                  {...register("pay")}
                />
              )}
            </div>
            <div className="label">
              <span>Insurance</span>
              <select {...register("insurance")}>
                {insurance ? (
                  <option value={true}>(current): Opt-IN</option>
                ) : (
                  <option value={false}>(current): Opt-OUT</option>
                )}
                <option value={false}>Opt-OUT</option>
                <option value={true}>Opt-IN</option>
              </select>
            </div>
            <div className="label">
              <span>Hire Date:</span>
              <DatePicker
                onChange={onHireChange}
                value={hireDateValue}
                calendarClassName="date-picker"
                clearIcon={null}
              />
            </div>
            <div className="label">
              <span>Promotion Date:</span>
              <DatePicker
                onChange={onPromotionChange}
                value={promotionDateValue}
                calendarClassName="date-picker"
                clearIcon={null}
              />
            </div>
            <div className="label">
              <span>Last Raise Date:</span>
              <DatePicker
                onChange={onRaiseChange}
                value={raiseDateValue}
                calendarClassName="date-picker"
                clearIcon={null}
              />
            </div>

            <input
              type="submit"
              value="Submit"
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
