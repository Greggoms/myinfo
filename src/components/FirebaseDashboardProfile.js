import React, { useState, useEffect } from "react"
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore"
import { ProfileDetails } from "./ProfileDetails"

export const FirebaseDashboardProfile = props => {
  const [list, setList] = useState([])
  const [refresh, setRefresh] = useState(false)
  const db = getFirestore()

  useEffect(() => {
    try {
      const q = query(collection(db, "users"), orderBy("name"))
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
  }, [refresh])

  const handleRefresh = () => {
    setRefresh(!refresh)
  }

  return props.layout === "profile"
    ? list.map(user => (
        <ProfileDetails
          key={user.id}
          layout="profile"
          id={user.id}
          name={user.name}
          email={user.email}
          location={user.location}
          position={user.position}
          hireDate={user.hireDate}
          promotionDate={user.promotionDate}
          hoursUsed={user.hoursUsed}
          pending={user.pending}
          accepted={user.accepted}
          insurance={user.insurance}
          lastRaise={user.lastRaise}
        />
      ))
    : list.map(user => (
        <ProfileDetails
          key={user.id}
          layout="payraise"
          id={user.id}
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
          insurance={user.insurance}
          lastRaise={user.lastRaise}
          handleRefresh={handleRefresh}
        />
      ))
}
