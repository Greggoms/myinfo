import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { useSelector } from "react-redux"
import { selectUsers } from "../../app/features/usersSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faIdBadge,
  faMoneyBill1Wave,
  faCashRegister,
  faBriefcaseMedical,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons"
import { ModifyUserForm } from "./ModifyUserForm"
import { DeleteUserForm } from "./DeleteUserForm"
import {
  daysUntil10Hrs,
  monthsWorked,
  getRemainingPto,
  timeForReview,
} from "../../utils/dateHelpers"
import handlePtoRequest from "../../utils/handlePtoRequest"
import { AdminButtonsContainer, DetailedUsersContainer } from "../../css"

export const UserListing = () => {
  const users = useSelector(selectUsers)

  const [filtered, setFiltered] = useState([])
  const [inputText, setInputText] = useState("")
  const [editing, setEditing] = useState(false)
  const [userId, setUserId] = useState("")
  const [userName, setUserName] = useState("")

  useEffect(() => {
    setFiltered(users)
  }, [users])

  function filterUsersBySearch(e) {
    setInputText(e.target.value.toLowerCase())
    setFiltered(
      users.filter(data =>
        data.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    )
  }

  // <button> filter Function
  // https://codesandbox.io/s/r5x4i?file=/src/App.js:555-768
  function filterUsersByButton(e) {
    switch (e.target.value) {
      case "reset":
        setFiltered(users)
        setInputText("")
        break
      case "submitted-pto":
        const filterBySubmitted = users.filter(user => {
          if (
            !user.pto ||
            !user.pto.submitted ||
            user.pto.submitted.length < 1
          ) {
            return null
          } else {
            return user
          }
        })
        setFiltered(filterBySubmitted)
        break
      case "pending-pto":
        const filterByPending = users.filter(user => {
          if (!user.pto || !user.pto.pending || user.pto.pending.length < 1) {
            return null
          } else {
            return user
          }
        })
        setFiltered(filterByPending)
        break
      case "raises":
        const filterByRaise = users.filter(user => {
          if (
            timeForReview(
              user.name,
              user.lastRaise,
              user.hireDate,
              user.position
            ) === true
          ) {
            return user
          } else {
            return null
          }
        })
        setFiltered(filterByRaise)
        break
      default:
        console.log(`${e.target.value} does not exist.`)
    }
  }

  const searchbarStyles = {
    width: "100%",
    padding: "5px",
    margin: "0 auto 20px",
  }

  const handleSetEditing = (id, name) => {
    setEditing(!editing)
    setUserId(id)
    setUserName(name)
  }

  // Filter button info to be mapped later
  const buttons = [
    {
      name: "Reset",
      value: "reset",
    },
    {
      name: "PTO Submissions",
      value: "submitted-pto",
    },
    {
      name: "Pending PTO",
      value: "pending-pto",
    },
    {
      name: "Due For Review",
      value: "raises",
    },
  ]

  // if (!users) {
  //   return <p>Loading...</p>
  // } else {
  return (
    <>
      <input
        id="searchbar"
        type="text"
        value={inputText}
        onChange={filterUsersBySearch}
        label="Search"
        placeholder="Search for an Employee"
        style={searchbarStyles}
      />
      <AdminButtonsContainer>
        <div className="filter-heading">
          <h3>Filter</h3>
          <p>
            Showing {filtered.length}/{users.length} results
          </p>
        </div>
        <div className="filters">
          {buttons.map((filter, index) => (
            <button
              key={index}
              value={filter.value}
              onClick={filterUsersByButton}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </AdminButtonsContainer>
      <DetailedUsersContainer>
        <div className="guide">
          <div className="label">
            <div className="dots__dot green" />
            <p>= PTO Submission</p>
          </div>
          <div className="label">
            <div className="dots__dot yellow" />
            <p>= Due for Review</p>
          </div>
        </div>
        <div className="list">
          {users !== undefined && users.length >= 1 ? (
            filtered.map(user => {
              return (
                <div className="user" key={user.id}>
                  <div className="heading">
                    <div className="heading__info">
                      <h3>
                        <Link to={`/app/admin/users/${user.id}`}>
                          {user.name}
                        </Link>
                      </h3>
                      <p>{user.email}</p>
                    </div>
                    <div className="dots">
                      {user.pto &&
                        user.pto.submitted &&
                        user.pto.submitted.length > 0 && (
                          <div className="dots__dot green" />
                        )}
                      {timeForReview(
                        user.name,
                        user.lastRaise,
                        user.hireDate,
                        user.position
                      ) === true && <div className="dots__dot yellow" />}
                    </div>
                  </div>
                  <hr />
                  <div className="user-general">
                    <div className="item">
                      <FontAwesomeIcon icon={faIdBadge} />
                      <p>
                        {user.position ? user.position : "Position not set"}
                      </p>
                    </div>
                    <div className="item">
                      <FontAwesomeIcon icon={faCashRegister} />
                      <p>
                        {user.location ? user.location : "Location not set"}
                      </p>
                    </div>
                    <div className="item">
                      <FontAwesomeIcon icon={faMoneyBill1Wave} />
                      <p>{user.pay ? `$${user.pay}` : "Pay rate not set"}</p>
                    </div>
                    <div className="item">
                      <FontAwesomeIcon icon={faBriefcaseMedical} />
                      <p>{user.insurance ? "Opt-IN" : "Opt-OUT"}</p>
                    </div>
                  </div>

                  <hr className="admin-hr" />

                  <div className="user-employment">
                    <FontAwesomeIcon icon={faCalendarDays} />
                    <div className="user-employment-dates">
                      {user.hireDate ? (
                        <div>
                          <span>Hire Date:</span>
                          <p>{user.hireDate}</p>
                          <span>
                            {monthsWorked(
                              user.hireDate.split("-")[0],
                              user.hireDate.split("-")[1],
                              user.hireDate.split("-")[2]
                            )}{" "}
                            months ago
                          </span>
                        </div>
                      ) : (
                        <p>No hire date</p>
                      )}
                      {user.lastRaise ? (
                        <div>
                          <span>Last Review Date:</span>
                          <p>{user.lastRaise}</p>
                          <span>
                            {monthsWorked(
                              user.lastRaise.split("-")[0],
                              user.lastRaise.split("-")[1],
                              user.lastRaise.split("-")[2]
                            )}{" "}
                            months ago
                          </span>
                        </div>
                      ) : (
                        <p>No review given</p>
                      )}
                      {user.promotionDate ? (
                        <div>
                          <span>Promotion Date:</span>
                          <p>{user.promotionDate}</p>
                          <span>
                            {monthsWorked(
                              user.promotionDate.split("-")[0],
                              user.promotionDate.split("-")[1],
                              user.promotionDate.split("-")[2]
                            )}{" "}
                            months ago
                          </span>
                        </div>
                      ) : (
                        <p>No promotion date</p>
                      )}
                    </div>
                  </div>

                  <hr className="admin-hr" />

                  <div className="pto-numbers">
                    {user.hireDate ? (
                      <p>
                        {getRemainingPto(
                          user.hireDate.split("-")[0],
                          user.hireDate.split("-")[1],
                          user.hireDate.split("-")[2],
                          user.hoursUsed ? user.hoursUsed : 0,
                          user.pto && user.pto.pending ? user.pto.pending : null
                        )}{" "}
                        Available Hours
                      </p>
                    ) : (
                      <p>No Hire Date</p>
                    )}
                    {user.hireDate ? (
                      <p>
                        +10 hours in{" "}
                        {daysUntil10Hrs(
                          user.hireDate.split("-")[0],
                          user.hireDate.split("-")[1],
                          user.hireDate.split("-")[2]
                        )}{" "}
                        days
                      </p>
                    ) : (
                      <p>No Hire Date</p>
                    )}
                    <p>
                      {user.hoursUsed
                        ? `${user.hoursUsed} hours used`
                        : "No PTO used"}
                    </p>
                  </div>

                  <hr className="admin-hr" />

                  <div className="requests">
                    <div className="info request">
                      {user.pto &&
                      user.pto.submitted &&
                      user.pto.submitted.length > 0 ? (
                        <details>
                          <summary>
                            Submitted Requests ({user.pto.submitted.length})
                          </summary>
                          <ul>
                            {user.pto.submitted.map((request, index) => {
                              return (
                                <li key={index}>
                                  <div className="manage-request">
                                    {typeof request.dates === "string" ? (
                                      <div>
                                        {request.dates} using {request.hours}{" "}
                                        hours.{" "}
                                        {request.type && (
                                          <span>- {request.type}</span>
                                        )}
                                      </div>
                                    ) : (
                                      <div>
                                        {request.dates[0]} to {request.dates[1]}{" "}
                                        using {request.hours} hours.{" "}
                                        {request.type && (
                                          <span>- {request.type}</span>
                                        )}
                                      </div>
                                    )}
                                    <div className="approve-deny">
                                      <button
                                        id="approve"
                                        className="approve"
                                        onClick={e =>
                                          handlePtoRequest(e, user, index)
                                        }
                                      >
                                        Approve
                                      </button>
                                      <button
                                        id="deny"
                                        className="deny"
                                        onClick={e =>
                                          handlePtoRequest(e, user, index)
                                        }
                                      >
                                        Deny
                                      </button>
                                    </div>
                                  </div>
                                </li>
                              )
                            })}
                          </ul>
                        </details>
                      ) : (
                        <h5>No Submitted Requests</h5>
                      )}
                    </div>

                    <div className="info request">
                      {user.pto && user.pto.pending ? (
                        <details>
                          <summary>
                            Pending Requests ({user.pto.pending.length})
                          </summary>
                          <ul>
                            {user.pto.pending.map((request, index) =>
                              typeof request.dates === "string" ? (
                                <li key={index}>
                                  {request.dates} using {request.hours} hours.{" "}
                                  {request.type && (
                                    <span>- {request.type}</span>
                                  )}
                                </li>
                              ) : (
                                <li key={index}>
                                  {request.dates[0]} to {request.dates[1]} using{" "}
                                  {request.hours} hours.{" "}
                                  {request.type && (
                                    <span>- {request.type}</span>
                                  )}
                                </li>
                              )
                            )}
                          </ul>
                        </details>
                      ) : (
                        <h5>No Pending Requests</h5>
                      )}
                    </div>
                    <div className="info request">
                      {user.pto && user.pto.accepted ? (
                        <details>
                          <summary>
                            Accepted Requests ({user.pto.accepted.length})
                          </summary>
                          <ul>
                            {user.pto.accepted.map((request, index) =>
                              typeof request.dates === "string" ? (
                                <li key={index}>
                                  {request.dates} using {request.hours} hours.{" "}
                                  {request.type && (
                                    <span>- {request.type}</span>
                                  )}
                                </li>
                              ) : (
                                <li key={index}>
                                  {request.dates[0]} to {request.dates[1]} using{" "}
                                  {request.hours} hours.{" "}
                                  {request.type && (
                                    <span>- {request.type}</span>
                                  )}
                                </li>
                              )
                            )}
                          </ul>
                        </details>
                      ) : (
                        <h5>No Accepted Requests</h5>
                      )}
                    </div>
                    <div className="info request">
                      {user.pto && user.pto.denied ? (
                        <details>
                          <summary>
                            Denied Requests ({user.pto.denied.length})
                          </summary>
                          <ul>
                            {user.pto.denied.map((request, index) =>
                              typeof request.dates === "string" ? (
                                <li key={index}>
                                  {request.dates} using {request.hours} hours.{" "}
                                  {request.type && (
                                    <span>- {request.type}</span>
                                  )}
                                </li>
                              ) : (
                                <li key={index}>
                                  {request.dates[0]} to {request.dates[1]} using{" "}
                                  {request.hours} hours.{" "}
                                  {request.type && (
                                    <span>- {request.type}</span>
                                  )}
                                </li>
                              )
                            )}
                          </ul>
                        </details>
                      ) : (
                        <h5>No Denied Requests</h5>
                      )}
                    </div>
                  </div>
                  <div className="action-buttons">
                    <button
                      onClick={() => handleSetEditing(user.id, user.name)}
                      className="modify-button"
                    >
                      {editing ? "Cancel" : "Edit"}
                    </button>
                    <DeleteUserForm id={user.id} />
                  </div>
                </div>
              )
            })
          ) : (
            <h3>Gathering Users...</h3>
          )}
        </div>
        {editing && (
          <div className="userListForm">
            <div className="grid">
              <div className="main">
                <h3>Editing {userName}...</h3>
                <ModifyUserForm
                  id={userId}
                  handleEditFunction={handleSetEditing}
                />
              </div>
              {/* eslint-disable-next-line */}
              <div className="overlay" onClick={handleSetEditing} />
            </div>
          </div>
        )}
      </DetailedUsersContainer>

      {filtered.length === 0 && <h3>No Match! Try another search.</h3>}
    </>
  )
  // }
}
