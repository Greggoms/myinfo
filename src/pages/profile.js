import React, { useState, useEffect } from "react"
import Seo from "../components/seo"
import {
  ProfileContainer,
  NetlifyIdentityContainer,
  DatabaseProfileContainer,
  RequestsContainer,
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
                  <h3>{ptoInfo.remainingPTO} Hours</h3>
                  <hr />
                  <p>Remaining PTO</p>
                </div>
                <div className="highlight">
                  <h3>{ptoInfo.daysUntil10Hrs} Days</h3>
                  <hr />
                  <p>+10Hrs</p>
                </div>
              </div>
              <div>
                <h2 className="special-h2">PTO Usage</h2>
                {ptoInfo.pending && (
                  <p>
                    Pending hours are NOT subtracted from remaining PTO. The
                    remaining hours are adjusted once the request is "Accepted".
                  </p>
                )}
                <RequestsContainer>
                  <div className="pending-requests requests">
                    <h3>Pending</h3>
                    {ptoInfo.pending ? (
                      ptoInfo.pending.map((request, index) => (
                        <ul key={index}>
                          <li>
                            {request.dates.length === 1
                              ? `${request.dates} `
                              : `${request.dates[0]} to ${request.dates[1]} `}
                            using {request.hours} hours.
                          </li>
                        </ul>
                      ))
                    ) : (
                      <p>No pending requests.</p>
                    )}
                  </div>
                  <div className="accepted-requests requests">
                    <h3>Accepted</h3>
                    {ptoInfo.accepted ? (
                      ptoInfo.accepted.map((request, index) => (
                        <ul key={index}>
                          <li>
                            {request.dates.length === 1
                              ? `${request.dates} `
                              : `${request.dates[0]} to ${request.dates[1]} `}
                            using {request.hours} hours.
                          </li>
                        </ul>
                      ))
                    ) : (
                      <p>
                        You haven't used any PTO. You might have some pending.
                      </p>
                    )}
                  </div>
                </RequestsContainer>
              </div>
            </DatabaseProfileContainer>
            <DatabaseProfileContainer>
              <h2>More Info</h2>
              <div className="highlights">
                <div className="highlight">
                  <h4>
                    <p>{ptoInfo.lifetimePTO} hours</p>
                  </h4>
                  <hr />
                  <p>Lifetime PTO</p>
                </div>
                <div className="highlight">
                  <h4>
                    <p>{ptoInfo.location}</p>
                  </h4>
                  <hr />
                  <p>Location</p>
                </div>
                <div className="highlight">
                  <h4>
                    <p>{ptoInfo.hireDate}</p>
                  </h4>
                  <hr />
                  <p>Hire Date</p>
                </div>
                <div className="highlight">
                  <h4>
                    <p>{ptoInfo.position}</p>
                  </h4>
                  <hr />
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
