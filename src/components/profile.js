import React from "react"
import { useSelector } from "react-redux"
import { selectUserFireDoc, selectUser } from "../app/features/userSlice"
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
import PtoRequestForm from "./PtoRequestForm"
import { ProfileContainer } from "../css"
import { Link } from "gatsby"

const UserFireDoc = () => {
  const userAuth = useSelector(selectUser)
  const userFireDoc = useSelector(selectUserFireDoc)

  if (userAuth && !userFireDoc) {
    return <h2 style={{ textAlign: "center" }}>Fetching your Profile...</h2>
  } else if (!userAuth || !userFireDoc) {
    return (
      <Notification lock={true}>
        You need to be <Link to="/login">logged in</Link> to view this page.
      </Notification>
    )
  } else if (userAuth && userFireDoc) {
    return (
      <>
        <GatsbySeo
          nofollow={true}
          noindex={true}
          title={`${userFireDoc.name}'s Profile | AbbyHQ`}
        />
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
                      userFireDoc.hireDate.split("-")[0],
                      userFireDoc.hireDate.split("-")[1],
                      userFireDoc.hireDate.split("-")[2]
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
                      userFireDoc.hireDate.split("-")[0],
                      userFireDoc.hireDate.split("-")[1],
                      userFireDoc.hireDate.split("-")[2],
                      userFireDoc.hoursUsed ? userFireDoc.hoursUsed : 0,
                      userFireDoc.pto && userFireDoc.pto.pending
                        ? userFireDoc.pto.pending
                        : null
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
                      userFireDoc.hireDate.split("-")[0],
                      userFireDoc.hireDate.split("-")[1],
                      userFireDoc.hireDate.split("-")[2]
                    )}{" "}
                    days
                  </h2>
                  <p>on</p>
                  <p>
                    {dateFor10Hrs(
                      userFireDoc.hireDate.split("-")[0],
                      userFireDoc.hireDate.split("-")[1],
                      userFireDoc.hireDate.split("-")[2]
                    )}
                  </p>
                </>
              ) : (
                <h2>No Hire Date</h2>
              )}
            </div>
          </section>
          <PtoRequestForm />
          <section className="requests-container">
            <div className="request">
              {userFireDoc.pto &&
              userFireDoc.pto.submitted &&
              userFireDoc.pto.submitted.length >= 1 ? (
                <div>
                  <h2>
                    Submitted Requests ({userFireDoc.pto.submitted.length})
                  </h2>
                  <ul>
                    {userFireDoc.pto.submitted.map((request, index) => {
                      if (typeof request.dates === "string") {
                        return (
                          <li key={index}>
                            {request.dates} using {request.hours} hours.
                          </li>
                        )
                      } else {
                        return (
                          <li key={index}>
                            {request.dates[0]} to {request.dates[1]} using{" "}
                            {request.hours} hours.
                          </li>
                        )
                      }
                    })}
                  </ul>
                </div>
              ) : (
                <p>No Submitted Requests</p>
              )}
            </div>
            <div className="request">
              {userFireDoc.pto &&
              userFireDoc.pto.pending &&
              userFireDoc.pto.pending.length >= 1 ? (
                <div>
                  <h2>Pending Requests ({userFireDoc.pto.pending.length})</h2>
                  <ul>
                    {userFireDoc.pto.pending.map((request, index) =>
                      typeof request.dates === "string" ? (
                        <li key={index}>
                          {request.dates} using {request.hours} hours.
                        </li>
                      ) : (
                        <li key={index}>
                          {request.dates[0]} to {request.dates[1]} using{" "}
                          {request.hours} hours.
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
              {userFireDoc.pto &&
              userFireDoc.pto.accepted &&
              userFireDoc.pto.accepted.length >= 1 ? (
                <div>
                  <h2>Accepted Requests ({userFireDoc.pto.accepted.length})</h2>
                  <ul>
                    {userFireDoc.pto.accepted.map((request, index) =>
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
            <div className="request">
              {userFireDoc.pto &&
              userFireDoc.pto.denied &&
              userFireDoc.pto.denied.length >= 1 ? (
                <div>
                  <h2>Denied Requests ({userFireDoc.pto.denied.length})</h2>
                  <ul>
                    {userFireDoc.pto.denied.map((request, index) =>
                      typeof request.dates === "string" ? (
                        <li key={index}>
                          {request.dates} using {request.hours} hours.
                        </li>
                      ) : (
                        <li key={index}>
                          {request.dates[0]} to {request.dates[1]} using{" "}
                          {request.hours} hours.
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ) : (
                <p>No Denied Requests</p>
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
                          userFireDoc.hireDate.split("-")[0],
                          userFireDoc.hireDate.split("-")[1] - 1,
                          userFireDoc.hireDate.split("-")[2]
                        ),
                        `PPPP`
                      )}
                    </p>
                    <span>
                      {monthsWorked(
                        userFireDoc.hireDate.split("-")[0],
                        userFireDoc.hireDate.split("-")[1],
                        userFireDoc.hireDate.split("-")[2]
                      )}{" "}
                      months ago
                    </span>
                  </>
                ) : (
                  <p>No hire date.</p>
                )}
              </div>

              <div>
                <span>Last Review:</span>
                {userFireDoc.lastRaise ? (
                  <>
                    <p>
                      {format(
                        new Date(
                          userFireDoc.lastRaise.split("-")[0],
                          userFireDoc.lastRaise.split("-")[1] - 1,
                          userFireDoc.lastRaise.split("-")[2]
                        ),
                        `PPPP`
                      )}
                    </p>
                    <span>
                      {monthsWorked(
                        userFireDoc.lastRaise.split("-")[0],
                        userFireDoc.lastRaise.split("-")[1],
                        userFireDoc.lastRaise.split("-")[2]
                      )}{" "}
                      months ago
                    </span>
                  </>
                ) : (
                  <p>No review date.</p>
                )}
              </div>
              <div>
                <span>Promotion Date:</span>
                {userFireDoc.promotionDate ? (
                  <>
                    <p>
                      {format(
                        new Date(
                          userFireDoc.promotionDate.split("-")[0],
                          userFireDoc.promotionDate.split("-")[1] - 1,
                          userFireDoc.promotionDate.split("-")[2]
                        ),
                        `PPPP`
                      )}
                    </p>
                    <span>
                      {monthsWorked(
                        userFireDoc.promotionDate.split("-")[0],
                        userFireDoc.promotionDate.split("-")[1],
                        userFireDoc.promotionDate.split("-")[2]
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
      </>
    )
  }
}

export default UserFireDoc
