import React, { useState, useEffect } from "react"
import { getFirestore, collection, getDocs, query } from "firebase/firestore"
import { v4 as uuidv4 } from "uuid"
import { ProfileDetails } from "./ProfileDetails"

export const FirebaseDashboardProfile = props => {
  const [list, setList] = useState([])
  const db = getFirestore()

  useEffect(() => {
    try {
      const q = query(collection(db, "users"))
      async function getUsers() {
        const querySnapshot = await getDocs(q)
        if (querySnapshot !== undefined) {
          setList(querySnapshot.docs.map(data => data.data()))
        } else {
          setList([])
        }
      }
      getUsers()
    } catch (err) {
      console.log("Error retrieving list: ", err)
    }
    // eslint-disable-next-line
  }, [])

  return props.layout === "profile"
    ? list.map(user => (
        <ProfileDetails
          key={uuidv4()}
          layout="profile"
          id={`a${uuidv4()}`}
          name={user.name}
          email={user.email}
          location={user.location}
          position={user.position}
          hireDate={user.hireDate}
          promotionDate={user.promotionDate}
          hoursUsed={user.hoursUsed}
          pending={user.pending}
          accepted={user.accepted}
        />
      ))
    : list.map(user => (
        <ProfileDetails
          key={uuidv4()}
          layout="payraise"
          id={`a${uuidv4()}`}
          name={user.name}
          email={user.email}
          location={user.location}
          position={user.position}
          pay={user.pay}
          hireDate={user.hireDate}
          promotionDate={user.promotionDate}
          hoursUsed={user.hoursUsed}
          pending={user.pending}
          accepted={user.accepted}
        />
      ))
}
