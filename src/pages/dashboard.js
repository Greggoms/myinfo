import React, { useState, useEffect } from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import Seo from "../components/seo"
import { ReactTable } from "../components/ReactTable"
import { EmployeesList } from "../services/FireDatabase"
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
  const [tableIsActive, setTableIsActive] = useState(true)
  const [profileIsActive, setProfileIsActive] = useState(false)
  const [payRaiseIsActive, setPayRaiseIsActive] = useState(false)
  const [editEmployeeIsActive, setEditEmployeeIsActive] = useState(false)
  const [user, setUser] = useState([])

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user)
    })
  }, [user])

  // eslint-disable-next-line
  if (user && user.role === "admin") {
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
                <EmployeesList layout="profile" />
              </DashboardProfilesContainer>
            </div>
            <div style={payRaiseIsActive ? styles.active : styles.inactive}>
              <DashboardProfilesContainer>
                <EmployeesList layout="payraise" />
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
            maxWidth: "30rem",
            height: "100%",
            opacity: 0.5,
          }}
        />
      </div>
    </DashboardPageErrorContainer>
  )
}

export default DashboardPage
