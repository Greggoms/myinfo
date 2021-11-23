import React from "react"

export const Profile = props => {
  return (
    <div>
      <h1>{`${props.firstName} ${props.lastName}`}</h1>
      <h2>Hire Date: {props.hireDate}</h2>
      <h2>Location: {props.location}</h2>
      <p>Lifetime PTO: {props.lifetimePTO}</p>
      <p>Hours Used: {props.hoursUsed}</p>
      <p>Remaining PTO: {props.remainingPTO}</p>
      <p>Days until +10 Hours: {props.daysUntil10Hrs}</p>
    </div>
  )
}
