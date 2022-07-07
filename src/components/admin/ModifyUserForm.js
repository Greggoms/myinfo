import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { modifyUser } from "../../app/features/usersSlice"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseInit"
import { useForm } from "react-hook-form"
import emailjs, { init } from "@emailjs/browser"
import { toast } from "react-toastify"

import { locations } from "../../data/locations"
import { positions } from "../../data/positions"
import { ModifyUserContainer } from "../../css"

export const ModifyUserForm = props => {
  const dispatch = useDispatch()

  const users = useSelector(state => state.users.value)
  const user = users.find(person => person.id === props.id)

  const [newHireDate, setNewHireDate] = useState(
    user && user.hireDate ? user.hireDate : ""
  )
  const [newPromotionDate, setNewPromotionDate] = useState(
    user && user.promotionDate ? user.promotionDate : ""
  )
  const [newRaiseDate, setNewRaiseDate] = useState(
    user && user.lastRaise ? user.lastRaise : ""
  )

  const { register, handleSubmit } = useForm()

  const onSubmit = async data => {
    try {
      init(`${process.env.GATSBY_EMAILJS_PUBLIC_KEY}`)
      // These values can be used in the email template settings
      const templateParams = {
        firstName: data.name,
        name: user.name === data.name ? "" : `${user.name} to ${data.name}`,
        location:
          user.location === data.location
            ? ""
            : `${user.location} to ${data.location}`,
        position:
          user.position === data.position
            ? ""
            : `${user.position} to ${data.position}`,
        pay: user.pay === data.pay ? "" : `${user.pay} to ${data.pay}`,
        insurance:
          user.insurance === data.insurance
            ? ""
            : `${user.insurance} to ${data.insurance}`,
        hireDate:
          user.hireDate === data.hireDate
            ? ""
            : `${user.hireDate} to ${data.hireDate}`,
        promotionDate:
          user.promotionDate === data.promotionDate
            ? ""
            : `${user.promotionDate} to ${data.promotionDate}`,
        lastRaise:
          user.lastRaise === data.lastRaise
            ? ""
            : `${user.lastRaise} to ${data.lastRaise}`,
      }
      dispatch(modifyUser(data))

      // Send the email
      await emailjs.send(
        `${process.env.GATSBY_PAYROLL_EMAILJS_SERVICE_ID}`,
        `${process.env.GATSBY_PAYROLL_EMAILJS_TEMPLATE_ID}`,
        templateParams,
        `${process.env.GATSBY_EMAILJS_PUBLIC_KEY}`
      )

      async function updateUser() {
        const userRef = doc(db, "users", data.id)
        await updateDoc(userRef, data)
      }
      updateUser()

      toast.info(() => <h2>{data.name} Updated!</h2>)

      props.handleEditFunction()
    } catch (err) {
      toast.error(err.message)
      console.log("Error! ->", err)
    }
  }

  return (
    <ModifyUserContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("id")} value={user.id} />
        <input type="hidden" {...register("email")} value={user.email} />
        <label>
          <span>Full Name:</span>
          <input
            placeholder={`(current): ${user.name}`}
            defaultValue={user.name}
            type="text"
            {...register("name")}
          />
        </label>
        <label>
          <span>Location:</span>
          <select {...register("location")}>
            {user.location ? (
              <option value={user.location}>(current): {user.location}</option>
            ) : (
              <option value="">Select a Location</option>
            )}
            {locations.map(location => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Position:</span>
          <select {...register("position")}>
            {user.position ? (
              <option value={user.position}>(current): {user.position}</option>
            ) : (
              <option value="">Select a Position</option>
            )}
            {positions.map(position => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Pay Rate:</span>
          {user.pay ? (
            <input
              type="number"
              inputMode="numeric"
              step="0.01"
              placeholder={`(current): $${user.pay}`}
              defaultValue={user.pay}
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
        </label>
        <label>
          <span>Insurance</span>
          <select
            {...register("insurance", {
              setValueAs: v => Boolean(v),
            })}
          >
            {user.insurance === true ? (
              <option value={true}>(current): Opt-IN</option>
            ) : (
              <option value="">(current): Opt-OUT</option>
            )}
            <option value="">Opt-OUT</option>
            <option value={true}>Opt-IN</option>
          </select>
        </label>
        <label>
          <span>
            Hire Date: (current: {user.hireDate ? user.hireDate : "None"})
          </span>
          <input
            type="date"
            {...register("hireDate")}
            onChange={e => setNewHireDate(e.target.value)}
            value={newHireDate}
          />
        </label>
        <label>
          <span>
            Promotion Date: (current:{" "}
            {user.promotionDate ? user.promotionDate : "None"})
          </span>
          <input
            type="date"
            {...register("promotionDate")}
            onChange={e => setNewPromotionDate(e.target.value)}
            value={newPromotionDate}
          />
        </label>
        <label>
          <span>
            Last Review Date: (current:{" "}
            {user.lastRaise ? user.lastRaise : "None"})
          </span>
          <input
            type="date"
            {...register("lastRaise")}
            onChange={e => setNewRaiseDate(e.target.value)}
            value={newRaiseDate}
          />
        </label>

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
  )
}
