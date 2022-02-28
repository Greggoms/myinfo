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
  const [inputText, setInputText] = useState("")
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

  const inputHandler = e => {
    //convert input text to lower case
    setInputText(e.target.value.toLowerCase())
  }

  const filteredData = list.filter(el => {
    //if no input the return the original
    if (inputText === "") {
      return el
    }
    //return the item which contains the user input
    else {
      return el.name.toLowerCase().includes(inputText)
    }
  })
  return (
    <>
      {/* // https://dev.to/salehmubashar/search-bar-in-react-js-545l */}
      <input
        id="searchbar"
        type="text"
        onChange={inputHandler}
        label="Search"
        placeholder="Search for an Employee"
      />
      {filteredData.map(user => (
        <ProfileDetails
          key={user.id}
          id={user.id}
          layout={props.layout}
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
      ))}
    </>
  )
}
