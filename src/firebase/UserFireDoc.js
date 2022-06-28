import React from "react"
import { useSelector } from "react-redux"
import { selectUser, selectUserFireDoc } from "../app/features/userSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faIdBadge,
  faMoneyBill1Wave,
  faCashRegister,
  faBriefcaseMedical,
  faCalendarDays,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons"
import { GatsbySeo } from "gatsby-plugin-next-seo"
import { format } from "date-fns"
import {
  dateFor10Hrs,
  daysUntil10Hrs,
  lifetimePTO,
  monthsWorked,
  remainingPTO,
} from "../data/dateHelpers"

import { Notification } from "../components/Notification"
import Svg from "../svg/lock.svg"
import { ProfileContainer } from "../css"

export const UserFireDoc = () => {
  const user = useSelector(selectUser)
  const userFireDoc = useSelector(selectUserFireDoc)

  return !user ? (
    <>
      <GatsbySeo nofollow={true} noindex={true} title={`Profile | AbbyHQ`} />
      <Notification message="You must be logged in to view your profile." />
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
    </>
  ) : (
    <>
      <GatsbySeo
        nofollow={true}
        noindex={true}
        title={`${user.name}'s Profile | AbbyHQ`}
      />
      {userFireDoc ? (
        <ProfileContainer>
          <aside className="aside-1">
            <h2>{userFireDoc.name.split(" ")[0]}</h2>
            <hr className="flexed" />
            <div className="aside-info">
              <div className="aside-info__piece">
                <FontAwesomeIcon icon={faIdBadge} />
                {userFireDoc.position ? (
                  <p>{userFireDoc.position}</p>
                ) : (
                  <p>Position not set</p>
                )}
              </div>

              <div className="aside-info__piece">
                <FontAwesomeIcon icon={faMoneyBill1Wave} />
                {userFireDoc.pay ? (
                  <p>{userFireDoc.pay}</p>
                ) : (
                  <p>Pay rate not set</p>
                )}
              </div>

              <div className="aside-info__piece">
                <FontAwesomeIcon icon={faCashRegister} />
                {userFireDoc.location ? (
                  <p>{userFireDoc.location}</p>
                ) : (
                  <p>Location not set</p>
                )}
              </div>

              <div className="aside-info__piece">
                <FontAwesomeIcon icon={faBriefcaseMedical} />
                <p>{userFireDoc.insurance === true ? "Opt-IN" : "Opt-OUT"}</p>
              </div>
            </div>
          </aside>
          <aside className="aside-2">
            <h3>Stats</h3>
            <hr className="flexed" />
            <div className="stats">
              <div className="stat">
                {userFireDoc.hireDate ? (
                  <p>
                    Lifetime PTO:{" "}
                    {lifetimePTO(
                      userFireDoc.hireDate.split("/")[2],
                      userFireDoc.hireDate.split("/")[0],
                      userFireDoc.hireDate.split("/")[1]
                    )}{" "}
                    hours
                  </p>
                ) : (
                  <p>No Hire Date</p>
                )}
              </div>
              <div className="stat">
                {userFireDoc.hoursUsed ? (
                  <p>PTO Used: {userFireDoc.hoursUsed} hours</p>
                ) : (
                  <p>No PTO Used</p>
                )}
              </div>
            </div>
          </aside>
          <section className="info-pto">
            <div className="badge">
              {userFireDoc.hireDate ? (
                <>
                  <h2>
                    {remainingPTO(
                      userFireDoc.hireDate.split("/")[2],
                      userFireDoc.hireDate.split("/")[0],
                      userFireDoc.hireDate.split("/")[1],
                      userFireDoc.hoursUsed ? userFireDoc.hoursUsed : 0,
                      userFireDoc.pending ? userFireDoc.pending : null
                    )}
                  </h2>
                  <p>Available Hours</p>
                </>
              ) : (
                <h2>No Hire Date</h2>
              )}
            </div>
            <div className="badge">
              {userFireDoc.hireDate ? (
                <>
                  <h2>
                    +10 hours in{" "}
                    {daysUntil10Hrs(
                      userFireDoc.hireDate.split("/")[2],
                      userFireDoc.hireDate.split("/")[0],
                      userFireDoc.hireDate.split("/")[1]
                    )}{" "}
                    days
                  </h2>
                  <p>on</p>
                  <p>
                    {dateFor10Hrs(
                      userFireDoc.hireDate.split("/")[2],
                      userFireDoc.hireDate.split("/")[0],
                      userFireDoc.hireDate.split("/")[1]
                    )}
                  </p>
                </>
              ) : (
                <h2>No Hire Date</h2>
              )}
            </div>
          </section>
          <section className="requests-container">
            <div className="request">
              {userFireDoc.pending ? (
                <div>
                  <h2>Pending Requests ({userFireDoc.pending.length})</h2>
                  <ul>
                    {userFireDoc.pending.map((request, index) =>
                      request.dates.length > 1 ? (
                        <li key={index}>
                          {request.dates[0]} to {request.dates[1]} using{" "}
                          {request.hours} hours.
                        </li>
                      ) : (
                        <li key={index}>
                          {request.dates} using {request.hours} hours.
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ) : (
                <p>No Pending Requests</p>
              )}
            </div>
            <div className="request">
              {userFireDoc.accepted ? (
                <div>
                  <h2>Accepted Requests ({userFireDoc.accepted.length})</h2>
                  <hr />
                  <ul>
                    {userFireDoc.accepted.map((request, index) =>
                      request.dates.length > 1 ? (
                        <li key={index}>
                          {request.dates[0]} to {request.dates[1]} using{" "}
                          {request.hours} hours.
                        </li>
                      ) : (
                        <li key={index}>
                          {request.dates} using {request.hours} hours.
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ) : (
                <p>No Accepted Requests</p>
              )}
            </div>
          </section>
          <section className="info-dates">
            <FontAwesomeIcon icon={faCalendarDays} />
            <div className="words">
              <div>
                <span>Hire Date:</span>
                {userFireDoc.hireDate ? (
                  <>
                    <p>
                      {format(
                        new Date(
                          userFireDoc.hireDate.split("/")[2],
                          userFireDoc.hireDate.split("/")[0] - 1,
                          userFireDoc.hireDate.split("/")[1]
                        ),
                        `PPPP`
                      )}
                    </p>
                    <span>
                      {monthsWorked(
                        userFireDoc.hireDate.split("/")[2],
                        userFireDoc.hireDate.split("/")[0],
                        userFireDoc.hireDate.split("/")[1]
                      )}{" "}
                      months ago
                    </span>
                  </>
                ) : (
                  <p>No hire date.</p>
                )}
              </div>

              <div>
                <span>Last Raise:</span>
                {userFireDoc.lastRaise ? (
                  <>
                    <p>
                      {format(
                        new Date(
                          userFireDoc.lastRaise.split("/")[2],
                          userFireDoc.lastRaise.split("/")[0] - 1,
                          userFireDoc.lastRaise.split("/")[1]
                        ),
                        `PPPP`
                      )}
                    </p>
                    <span>
                      {monthsWorked(
                        userFireDoc.lastRaise.split("/")[2],
                        userFireDoc.lastRaise.split("/")[0],
                        userFireDoc.lastRaise.split("/")[1]
                      )}{" "}
                      months ago
                    </span>
                  </>
                ) : (
                  <p>No raise date.</p>
                )}
              </div>
              <div>
                <span>Promotion Date:</span>
                {userFireDoc.promotionDate ? (
                  <>
                    <p>
                      {format(
                        new Date(
                          userFireDoc.promotionDate.split("/")[2],
                          userFireDoc.promotionDate.split("/")[0] - 1,
                          userFireDoc.promotionDate.split("/")[1]
                        ),
                        `PPPP`
                      )}
                    </p>
                    <span>
                      {monthsWorked(
                        userFireDoc.promotionDate.split("/")[2],
                        userFireDoc.promotionDate.split("/")[0],
                        userFireDoc.promotionDate.split("/")[1]
                      )}{" "}
                      months ago
                    </span>
                  </>
                ) : (
                  <p>No promotion date.</p>
                )}
              </div>
            </div>
          </section>
          <section className="info-account">
            <FontAwesomeIcon icon={faUserGear} />
            <div className="words">
              <p>{userFireDoc.email}</p>
              <p>Role: {userFireDoc.role}</p>
              <p>Firebase ID: {userFireDoc.id}</p>
            </div>
          </section>
        </ProfileContainer>
      ) : (
        <h2 style={{ textAlign: "center", fontSize: "32pt" }}>
          Fetching your profile...
        </h2>
      )}
    </>
  )
}
