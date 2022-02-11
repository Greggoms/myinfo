import React, { useState, useEffect } from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getFirestore, doc, getDoc } from "firebase/firestore"
import Seo from "../components/seo"
import { FirebaseDashboardProfile } from "../components/FirebaseDashboardProfile"
import { ReactTable } from "../components/ReactTable"
import { EditEmployee } from "../components/EditEmployee"
import { Notification } from "../components/Notification"
import {
  DashboardPageContainer,
  DashboardPageErrorContainer,
  EmployeeViewContainer,
  DashboardProfilesContainer,
} from "../elements"
import Svg from "../svg/lock.svg"

const DashboardPage = () => {
  const [user, setUser] = useState()
  const [uid, setUid] = useState("")
  const [details, setDetails] = useState([])
  const [tableIsActive, setTableIsActive] = useState(false)
  const [profileIsActive, setProfileIsActive] = useState(false)
  const [payRaiseIsActive, setPayRaiseIsActive] = useState(true)
  const [editEmployeeIsActive, setEditEmployeeIsActive] = useState(false)
  const db = getFirestore()

  useEffect(() => {
    try {
      let isMounted = true
      firebase.auth().onAuthStateChanged(user => {
        if (user && isMounted) {
          setUser(user)
          setUid(user.uid)
        } else {
          setUser(null)
        }
      })
      return () => {
        isMounted = false
      }
    } catch (err) {
      console.log("ERROR: ", err)
    }
  }, [user])

  useEffect(() => {
    try {
      const docRef = doc(db, `users/${uid}`)
      async function getUserDetails() {
        const docSnap = await getDoc(docRef)
        setDetails(docSnap.data())
      }
      getUserDetails()
    } catch {
      console.log(
        "Re-running useEffect to fill a previously undefined variable"
      )
    }
    // eslint-disable-next-line
  }, [uid])

  // eslint-disable-next-line
  if (user && details.role === "admin") {
    const styles = {
      active: {
        gridRow: 1,
        gridColumn: 1,
        transform: "scale(1)",
      },
      inactive: {
        gridRow: 2,
        gridColumn: 2,
        transform: "scale(0)",
      },
    }
    return (
      <DashboardPageContainer>
        <Seo title={`${user.firstName}'s Dashboard`} />
        <EmployeeViewContainer>
          <div className="button-container">
            <button
              onClick={() => {
                setTableIsActive(true)
                setProfileIsActive(false)
                setPayRaiseIsActive(false)
                setEditEmployeeIsActive(false)
              }}
              style={
                tableIsActive ? { color: "#F2F2F2" } : { color: "#595959" }
              }
            >
              Table
            </button>
            <button
              onClick={() => {
                setProfileIsActive(true)
                setTableIsActive(false)
                setPayRaiseIsActive(false)
                setEditEmployeeIsActive(false)
              }}
              style={
                profileIsActive ? { color: "#F2F2F2" } : { color: "#595959" }
              }
            >
              Cards
            </button>
            <button
              onClick={() => {
                setPayRaiseIsActive(true)
                setProfileIsActive(false)
                setTableIsActive(false)
                setEditEmployeeIsActive(false)
              }}
              style={
                payRaiseIsActive ? { color: "#F2F2F2" } : { color: "#595959" }
              }
            >
              Pay Raises
            </button>
            <button
              onClick={() => {
                setPayRaiseIsActive(false)
                setProfileIsActive(false)
                setTableIsActive(false)
                setEditEmployeeIsActive(true)
              }}
              style={
                editEmployeeIsActive
                  ? { color: "#F2F2F2" }
                  : { color: "#595959" }
              }
            >
              Edit Employee
            </button>
          </div>
          <div className="selected-component">
            <div style={tableIsActive ? styles.active : styles.inactive}>
              <ReactTable />
            </div>
            <div style={profileIsActive ? styles.active : styles.inactive}>
              <DashboardProfilesContainer>
                <FirebaseDashboardProfile layout="profile" />
              </DashboardProfilesContainer>
            </div>
            <div style={payRaiseIsActive ? styles.active : styles.inactive}>
              <DashboardProfilesContainer>
                <FirebaseDashboardProfile layout="payraise" />
              </DashboardProfilesContainer>
            </div>
            <div style={editEmployeeIsActive ? styles.active : styles.inactive}>
              <EditEmployee />
            </div>
          </div>
        </EmployeeViewContainer>
      </DashboardPageContainer>
    )
  }
  return (
    <DashboardPageErrorContainer>
      <Seo title="Dashboard" />
      <Notification message="You need Admin Rights for this." />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Svg
          style={{
            width: "100%",
            maxWidth: "25rem",
            height: "100%",
            opacity: 0.5,
          }}
        />
      </div>
    </DashboardPageErrorContainer>
  )
}

export default DashboardPage
