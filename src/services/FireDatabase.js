import React, { useState, useEffect } from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getFirestore, collection, getDocs, query } from "firebase/firestore"
import { FirebaseProfile } from "../components/FirebaseProfile"
import { FirebaseDashboardProfile } from "../components/FirebaseDashboardProfile"
import { v4 as uuidv4 } from "uuid"

import { differenceInCalendarDays, differenceInCalendarMonths } from "date-fns"
import { PayRaiseTable } from "./PayRaiseGuide"

const currentYear = new Date().getFullYear()
const currentMonth = parseInt(new Date().getMonth() + 1)
const currentDay = new Date().getDate()

const monthsWorked = (year, month, day) => {
  const result = differenceInCalendarMonths(
    new Date(currentYear, currentMonth, currentDay),
    new Date(year, month, day)
  )
  return result
}

const timeForRaise = (
  promotionYear,
  promotionMonth,
  promotionDay,
  position
) => {
  const result = differenceInCalendarMonths(
    new Date(currentYear, currentMonth, currentDay),
    new Date(promotionYear, promotionMonth, promotionDay)
  )
  if ((position === "Assist Mngr" || position === "Manager") && result >= 6) {
    return true
  }
  if (position === "Associate" && result >= 3) {
    return true
  }
}

const eligibleAmount = (
  promotionYear,
  promotionMonth,
  promotionDay,
  position
) => {
  const result = differenceInCalendarMonths(
    new Date(currentYear, currentMonth, currentDay),
    new Date(promotionYear, promotionMonth, promotionDay)
  )
  if (position === "Assist Mngr" && result < 6) {
    return PayRaiseTable.assistMngr.month0
  } else if (position === "Assist Mngr" && result >= 6 && result < 12) {
    return PayRaiseTable.assistMngr.month6
  } else if (position === "Assist Mngr" && result >= 12 && result < 18) {
    return PayRaiseTable.assistMngr.month12
  } else if (position === "Assist Mngr" && result >= 18 && result < 24) {
    return PayRaiseTable.assistMngr.month18
  } else if (position === "Assist Mngr" && result >= 24) {
    return PayRaiseTable.assistMngr.month24
  }
  if (position === "Manager" && result < 6) {
    return PayRaiseTable.manager.month0
  } else if (position === "Manager" && result >= 6 && result < 12) {
    return PayRaiseTable.manager.month6
  } else if (position === "Manager" && result >= 12 && result < 18) {
    return PayRaiseTable.manager.month12
  } else if (position === "Manager" && result >= 18 && result < 24) {
    return PayRaiseTable.manager.month18
  } else if (position === "Manager" && result >= 24) {
    return PayRaiseTable.manager.month24
  }
  if (position === "Associate" && result < 3) {
    return PayRaiseTable.associate.month0
  } else if (position === "Associate" && result >= 3 && result < 6) {
    return PayRaiseTable.associate.month3
  } else if (position === "Associate" && result >= 6 && result < 9) {
    return PayRaiseTable.associate.month6
  } else if (position === "Associate" && result >= 9 && result < 12) {
    return PayRaiseTable.associate.month9
  } else if (position === "Associate" && result >= 12 && result < 15) {
    return PayRaiseTable.associate.month12
  } else if (position === "Associate" && result >= 15 && result < 18) {
    return PayRaiseTable.associate.month15
  } else if (position === "Associate" && result >= 18 && result < 21) {
    return PayRaiseTable.associate.month18
  } else if (position === "Associate" && result >= 21 && result < 24) {
    return PayRaiseTable.associate.month21
  } else if (position === "Associate" && result >= 24) {
    return PayRaiseTable.associate.month24
  }
}

const lifetimePTO = (hireYear, hireMonth, hireDay) => {
  const result = differenceInCalendarDays(
    new Date(currentYear, currentMonth, currentDay),
    new Date(hireYear, hireMonth, hireDay)
  )
  return Math.floor(result / 91) * 10
}
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

export const FireUser = () => {
  const [user, setUser] = useState([])

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user)
    })
  }, [user])

  if (
    user /*&&
    user.email.toLowerCase() === firebase.auth().currentUser.email.toLowerCase()*/
  ) {
    return (
      <FirebaseProfile
        key={user.email ? user.email : `No Key`}
        firstName={user.firstName}
        lastName={user.lastName}
        email={user.email ? user.email : "No Email"}
        location={user.location ? user.location : `No Location`}
        hireDate={
          user.hireDate
            ? `${user.hireDate[0]}/${user.hireDate[1]}/${user.hireDate[2]}`
            : `No Hire Date`
        }
        position={user.position ? user.position : `No Position`}
        pay={user.pay ? user.pay : `No Pay`}
        remainingPTO={
          user.hireDate
            ? remainingPTO(
                user.hireDate[0],
                user.hireDate[1],
                user.hireDate[2],
                user.hoursUsed,
                user.pending
              )
            : `None`
        }
        lifetimePTO={
          user.hireDate
            ? lifetimePTO(user.hireDate[0], user.hireDate[1], user.hireDate[2])
            : `None`
        }
        daysUntil10Hrs={
          user.hireDate
            ? daysUntil10Hrs(
                user.hireDate[0],
                user.hireDate[1],
                user.hireDate[2]
              )
            : `N/A`
        }
        timeForRaise={
          user.hireDate
            ? timeForRaise(user.hireDate[0], user.hireDate[1], user.hireDate[2])
            : `N/A`
        }
        monthsWorkedTotal={
          user.hireDate
            ? monthsWorked(user.hireDate[0], user.hireDate[1], user.hireDate[2])
            : null
        }
        monthsWorkedAsPosition={
          user.promotionDate
            ? monthsWorked(
                user.promotionDate[0],
                user.promotionDate[1],
                user.promotionDate[2]
              )
            : null
        }
        accepted={user.accepted ? user.accepted : null}
        pending={user.pending ? user.pending : null}
      />
    )
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gridGap: "10px",
          margin: "0 auto",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <h3>You must've signed up with an unknown email.</h3>
        <h4>
          This means you didn't use your lightspeed email AND didn't inform me
          of the one you just tried to use.
        </h4>
        <p>
          Please notify me (greggoms) either through email at
          payroll@vhdistro.net or through DM on GroupMe with the email you just
          tried to use.
        </p>
        <p>
          I use your email as a key to match you to your profile behind the
          scenes. Sure, you can sign in with any email, but if that email
          doesn't match any records in Google Firebase, then you are presented
          with this screen. The second I make the change in Firebase, refresh
          this page and your profile will appear as normal.
        </p>
      </div>
    )
  }
}

export const EmployeesList = props => {
  const [list, setList] = useState([])

  // Initialize an instance of Cloud Firestore
  useEffect(() => {
    const db = getFirestore()
    const q = query(collection(db, "Employees"))

    async function getUsers() {
      const querySnapshot = await getDocs(q)
      setList(querySnapshot.docs.map(data => data.data()))
    }
    getUsers()
  }, [])
  return list.map(user => (
    <FirebaseDashboardProfile
      id={uuidv4()}
      layout={props.layout}
      key={user.email ? user.email : `No Key`}
      firstName={user.firstName}
      lastName={user.lastName}
      email={user.email ? user.email : "No Email"}
      location={user.location ? user.location : `No Location`}
      hireDate={
        user.hireDate
          ? `${user.hireDate[0]}/${user.hireDate[1]}/${user.hireDate[2]}`
          : `No Hire Date`
      }
      promotionDate={
        user.promotionDate
          ? `${user.promotionDate[0]}/${user.promotionDate[1]}/${user.promotionDate[2]}`
          : null
      }
      position={user.position ? user.position : `No Position`}
      pay={user.pay ? user.pay : `No Pay`}
      remainingPTO={
        user.hireDate
          ? remainingPTO(
              user.hireDate[0],
              user.hireDate[1],
              user.hireDate[2],
              user.hoursUsed,
              user.pending
            )
          : 0
      }
      lifetimePTO={
        user.hireDate
          ? lifetimePTO(user.hireDate[0], user.hireDate[1], user.hireDate[2])
          : 0
      }
      daysUntil10Hrs={
        user.hireDate
          ? daysUntil10Hrs(user.hireDate[0], user.hireDate[1], user.hireDate[2])
          : `N/A`
      }
      timeForRaise={
        user.hireDate
          ? (timeForRaise(user.hireDate[0], user.hireDate[1], user.hireDate[2]),
            "Associate")
          : `N/A`
      }
      eligible={
        user.promotionDate
          ? eligibleAmount(
              user.promotionDate[0],
              user.promotionDate[1],
              user.promotionDate[2],
              user.position
            )
          : eligibleAmount(
              user.hireDate[0],
              user.hireDate[1],
              user.hireDate[2],
              user.position
            )
      }
      monthsWorkedTotal={
        user.hireDate
          ? monthsWorked(user.hireDate[0], user.hireDate[1], user.hireDate[2])
          : `N/A`
      }
      monthsWorkedAsPosition={
        user.promotionDate
          ? monthsWorked(
              user.promotionDate[0],
              user.promotionDate[1],
              user.promotionDate[2]
            )
          : `N/A`
      }
      accepted={user.accepted ? user.accepted : null}
      pending={user.pending ? user.pending : null}
    />
  ))
}

export const EmployeesTable = () => {
  const [user, setUser] = useState([])

  // Initialize an instance of Cloud Firestore
  useEffect(() => {
    const db = getFirestore()
    async function getUsers() {
      const q = query(collection(db, "Employees"))

      const querySnapshot = await getDocs(q)
      setUser(querySnapshot.docs.map(res => res.data()))
    }
    getUsers()
  }, [])
  return user
}

export const AddEmployee = () => {
  return (
    <div>
      <p>Add Employee</p>
    </div>
  )
}
export const RemoveEmployee = () => {
  return (
    <div>
      <p>Remove Employee</p>
    </div>
  )
}
export const UpdateEmployee = () => {
  return (
    <div>
      <p>Update Employee</p>
    </div>
  )
}
