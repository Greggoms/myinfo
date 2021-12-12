import React, { useState, useEffect } from "react"
import Seo from "../components/seo"
import {
  ProfileContainer,
  NetlifyIdentityContainer,
  DatabaseProfileContainer,
} from "../elements"
import { data } from "../components/Database"
const netlifyIdentity = require("netlify-identity-widget")

const ProfilePage = () => {
  const [ptoInfo, setPtoInfo] = useState([])
  const user = netlifyIdentity.currentUser()

  // Attempt to match pto info from the Database to the
  // Netlify identity user by email matching.
  // It works!! next challenege: let mngrs see employee profiles.
  useEffect(() => {
    const person = user
      ? data.find(person => person.email === user.email)
      : null
    setPtoInfo(person)
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Seo title={user && `${user.user_metadata.full_name}'s Profile`} />
      <h1 style={{ textAlign: "center" }}>
        {user && user.user_metadata.full_name}'s Profile
      </h1>
      <ProfileContainer>
        {ptoInfo ? (
          <>
            <DatabaseProfileContainer>
              <h2>PTO Info</h2>
              <div className="highlights">
                <div className="highlight">
                  <h3>{ptoInfo.remainingPTO} hours</h3>
                  <p>Remaining PTO</p>
                </div>
                <div className="highlight">
                  <h3>{ptoInfo.daysUntil10Hrs}</h3>
                  <p>Days until +10Hrs</p>
                </div>
                <div className="highlight">
                  <h3>
                    <p>{ptoInfo.lifetimePTO} hours</p>
                  </h3>
                  <p>Lifetime PTO</p>
                </div>
              </div>
            </DatabaseProfileContainer>
            <DatabaseProfileContainer>
              <h2>More Info</h2>
              <div className="highlights">
                <div className="highlight">
                  <h3>
                    <p>{ptoInfo.location}</p>
                  </h3>
                  <p>Location</p>
                </div>
                <div className="highlight">
                  <h3>
                    <p>{ptoInfo.hireDate}</p>
                  </h3>
                  <p>Hire Date</p>
                </div>
                <div className="highlight">
                  <h3>
                    <p>{ptoInfo.position}</p>
                  </h3>
                  <p>Position</p>
                </div>
              </div>
            </DatabaseProfileContainer>
          </>
        ) : (
          <>
            <div style={{ margin: "1rem 0 3rem" }}>
              <h2 style={{ marginBottom: "0.3rem" }}>PTO Info</h2>
              <h3>Almost available!</h3>
            </div>
            <div style={{ margin: "1rem 0 3rem" }}>
              <h2 style={{ marginBottom: "0.3rem" }}>More Info</h2>
              <h3>Almost available!</h3>
            </div>
          </>
        )}
        {user && (
          <NetlifyIdentityContainer>
            <h2>Account Info</h2>
            <p>Email: {user.email}</p>
            <p>Created: {user.created_at.slice(0, 10)}</p>
            <p>
              Confirmation Email Sent:{" "}
              {user.confirmation_sent_at
                ? user.confirmation_sent_at.slice(0, 10)
                : `Not sent? Thats a problem...`}
            </p>
            <p>Email Confirmed: {user.confirmed_at.slice(0, 10)}</p>
            <p>
              Recovery email sent:{" "}
              {user.recovery_sent_at
                ? user.recovery_sent_at.slice(0, 10)
                : `No reset link sent.`}
            </p>
            <p>
              Role(s):{" "}
              {user.app_metadata.roles
                ? user.app_metadata.roles.map(role => role)
                : "No Role Set"}
            </p>
          </NetlifyIdentityContainer>
        )}
      </ProfileContainer>
    </>
  )
}

export default ProfilePage
