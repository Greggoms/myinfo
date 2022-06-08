import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { selectUser } from "../app/features/userSlice"
import { selectUserFireDoc } from "../app/features/userSlice"
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
  const [splitHireDate, setSplitHireDate] = useState("")
  const [splitPromotionDate, setSplitPromotionDate] = useState("")
  const [splitRaiseDate, setSplitRaiseDate] = useState("")

  useEffect(() => {
    if (userFireDoc && userFireDoc.hireDate) {
      setSplitHireDate(userFireDoc.hireDate.split("/"))
    }
    if (userFireDoc && userFireDoc.promotionDate) {
      setSplitPromotionDate(userFireDoc.promotionDate.split("/"))
    }
    if (userFireDoc && userFireDoc.lastRaise) {
      setSplitRaiseDate(userFireDoc.lastRaise.split("/"))
    }
    // eslint-disable-next-line
  }, [userFireDoc])

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
          <aside>
            <h2>{userFireDoc.name.split(" ")[0]}</h2>
            <hr className="flexed" />
            <div className="info-container">
              <div className="info">
                <FontAwesomeIcon icon={faIdBadge} />
                {userFireDoc.position ? (
                  <p>{userFireDoc.position}</p>
                ) : (
                  <p>Position not set</p>
                )}
              </div>

              <div className="info">
                <FontAwesomeIcon icon={faMoneyBill1Wave} />
                {userFireDoc.pay ? (
                  <p>{userFireDoc.pay}</p>
                ) : (
                  <p>Pay rate not set</p>
                )}
              </div>

              <div className="info">
                <FontAwesomeIcon icon={faCashRegister} />
                {userFireDoc.location ? (
                  <p>{userFireDoc.location}</p>
                ) : (
                  <p>Location not set</p>
                )}
              </div>

              <div className="info">
                <FontAwesomeIcon icon={faBriefcaseMedical} />
                <p>{userFireDoc.insurance ? "Opt-IN" : "Opt-OUT"}</p>
              </div>
            </div>
          </aside>
          <aside className="stats">
            <h3>Stats</h3>
            <hr className="flexed" />
            <div className="stat">
              {userFireDoc.hireDate ? (
                <p>
                  Lifetime PTO:{" "}
                  {lifetimePTO(
                    splitHireDate[2],
                    splitHireDate[0],
                    splitHireDate[1]
                  )}{" "}
                  hours
                </p>
              ) : (
                <p>No Hire Date</p>
              )}
            </div>
            <div className="stat">
              {userFireDoc.hireDate ? (
                <p>PTO Used: {userFireDoc.hoursUsed ? "hours" : "None"}</p>
              ) : (
                <p>No Hire Date</p>
              )}
            </div>
          </aside>
          <section className="info-pto">
            <div className="info info-badge">
              {userFireDoc.hireDate ? (
                <>
                  <h2>
                    {remainingPTO(
                      splitHireDate[2],
                      splitHireDate[0],
                      splitHireDate[1],
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
            <div className="info info-badge">
              {splitHireDate !== "" ? (
                <>
                  <h2>
                    +10 hours in{" "}
                    {daysUntil10Hrs(
                      splitHireDate[2],
                      splitHireDate[0],
                      splitHireDate[1]
                    )}{" "}
                    days
                  </h2>
                  <p>on</p>
                  <p>
                    {format(
                      new Date(
                        dateFor10Hrs(
                          splitHireDate[2],
                          splitHireDate[0],
                          splitHireDate[1]
                        )
                      ),
                      "PPPP"
                    )}
                  </p>
                </>
              ) : (
                <h2>No Hire Date</h2>
              )}
            </div>
          </section>
          <section className="info-account">
            <div className="info info-long">
              <FontAwesomeIcon icon={faCalendarDays} />
              <div className="spacer">
                <div>
                  <span>Hire Date:</span>
                  {splitHireDate !== "" ? (
                    <p>
                      {format(
                        new Date(
                          splitHireDate[2],
                          splitHireDate[0],
                          splitHireDate[1]
                        ),
                        "PPPP"
                      )}
                      {"  "}(
                      {monthsWorked(
                        splitHireDate[2],
                        splitHireDate[0],
                        splitHireDate[1]
                      )}{" "}
                      months ago)
                    </p>
                  ) : (
                    <p>No hire date.</p>
                  )}
                </div>

                <div>
                  <span>Last Raise:</span>
                  {splitRaiseDate !== "" ? (
                    <p>
                      {format(
                        new Date(
                          splitRaiseDate[2],
                          splitRaiseDate[0],
                          splitRaiseDate[1]
                        ),
                        "PPPP"
                      )}{" "}
                      (
                      {monthsWorked(
                        splitRaiseDate[2],
                        splitRaiseDate[0],
                        splitRaiseDate[1]
                      )}{" "}
                      months ago)
                    </p>
                  ) : (
                    <p>No raise date.</p>
                  )}
                </div>
                <div>
                  <span>Promotion Date:</span>
                  {splitPromotionDate !== "" ? (
                    <p>
                      {format(
                        new Date(
                          splitPromotionDate[2],
                          splitPromotionDate[0],
                          splitPromotionDate[1]
                        ),
                        "PPPP"
                      )}{" "}
                      (
                      {monthsWorked(
                        splitPromotionDate[2],
                        splitPromotionDate[0],
                        splitPromotionDate[1]
                      )}{" "}
                      months ago)
                    </p>
                  ) : (
                    <p>No promotion date.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="info info-long">
              <FontAwesomeIcon icon={faUserGear} />
              <div className="spacer">
                <p>{userFireDoc.email}</p>
                <p>Role: {userFireDoc.role}</p>
                <p>Firebase ID: {userFireDoc.id}</p>
              </div>
            </div>
          </section>
          <section className="info-pto-usage requests-container">
            <div className="info request">
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
            <div className="info request">
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
        </ProfileContainer>
      ) : (
        <h2 style={{ textAlign: "center", fontSize: "32pt" }}>
          Fetching your profile...
        </h2>
      )}
    </>
  )
}
