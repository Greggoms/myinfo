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
  remainingPTO,
  timeForReview,
} from "../../data/dateHelpers"
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
            filtered.map(
              ({
                id,
                name,
                email,
                pay,
                insurance,
                hireDate,
                lastRaise,
                promotionDate,
                position,
                location,
                hoursUsed,
                pto,
              }) => {
                return (
                  <div className="user" key={id}>
                    <div className="heading">
                      <div className="heading__info">
                        <h3>
                          <Link to={`/app/admin/users/${id}`}>{name}</Link>
                        </h3>
                        <p>{email}</p>
                      </div>
                      <div className="dots">
                        {pto && pto.submitted && pto.submitted.length > 0 && (
                          <div className="dots__dot green" />
                        )}
                        {timeForReview(name, lastRaise, hireDate, position) ===
                          true && <div className="dots__dot yellow" />}
                      </div>
                    </div>
                    <hr />
                    <div className="user-general">
                      <div className="item">
                        <FontAwesomeIcon icon={faIdBadge} />
                        <p>{position ? position : "Position not set"}</p>
                      </div>
                      <div className="item">
                        <FontAwesomeIcon icon={faCashRegister} />
                        <p>{location ? location : "Location not set"}</p>
                      </div>
                      <div className="item">
                        <FontAwesomeIcon icon={faMoneyBill1Wave} />
                        <p>{pay ? `$${pay}` : "Pay rate not set"}</p>
                      </div>
                      <div className="item">
                        <FontAwesomeIcon icon={faBriefcaseMedical} />
                        <p>{insurance ? "Opt-IN" : "Opt-OUT"}</p>
                      </div>
                    </div>

                    <hr className="admin-hr" />

                    <div className="user-employment">
                      <FontAwesomeIcon icon={faCalendarDays} />
                      <div className="user-employment-dates">
                        {hireDate ? (
                          <div>
                            <span>Hire Date:</span>
                            <p>{hireDate}</p>
                            <span>
                              {monthsWorked(
                                hireDate.split("-")[0],
                                hireDate.split("-")[1],
                                hireDate.split("-")[2]
                              )}{" "}
                              months ago
                            </span>
                          </div>
                        ) : (
                          <p>No hire date</p>
                        )}
                        {lastRaise ? (
                          <div>
                            <span>Last Review Date:</span>
                            <p>{lastRaise}</p>
                            <span>
                              {monthsWorked(
                                lastRaise.split("-")[0],
                                lastRaise.split("-")[1],
                                lastRaise.split("-")[2]
                              )}{" "}
                              months ago
                            </span>
                          </div>
                        ) : (
                          <p>No review given</p>
                        )}
                        {promotionDate ? (
                          <div>
                            <span>Promotion Date:</span>
                            <p>{promotionDate}</p>
                            <span>
                              {monthsWorked(
                                promotionDate.split("-")[0],
                                promotionDate.split("-")[1],
                                promotionDate.split("-")[2]
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
                      {hireDate ? (
                        <p>
                          {remainingPTO(
                            hireDate.split("-")[0],
                            hireDate.split("-")[1],
                            hireDate.split("-")[2],
                            hoursUsed ? hoursUsed : 0,
                            pto && pto.pending ? pto.pending : null
                          )}{" "}
                          Available Hours
                        </p>
                      ) : (
                        <p>No Hire Date</p>
                      )}
                      {hireDate ? (
                        <p>
                          +10 hours in{" "}
                          {daysUntil10Hrs(
                            hireDate.split("-")[0],
                            hireDate.split("-")[1],
                            hireDate.split("-")[2]
                          )}{" "}
                          days
                        </p>
                      ) : (
                        <p>No Hire Date</p>
                      )}
                      <p>
                        {hoursUsed ? `${hoursUsed} hours used` : "No PTO used"}
                      </p>
                    </div>

                    <hr className="admin-hr" />

                    <div className="requests">
                      <div className="info request">
                        {pto && pto.submitted && pto.submitted.length > 0 ? (
                          <details>
                            <summary>
                              Submitted Requests ({pto.submitted.length})
                            </summary>
                            <ul>
                              {pto.submitted.map((request, index) => {
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
                                          {request.dates[0]} to{" "}
                                          {request.dates[1]} using{" "}
                                          {request.hours} hours.{" "}
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
                                            handlePtoRequest(e, id, index)
                                          }
                                        >
                                          Approve
                                        </button>
                                        <button
                                          id="deny"
                                          className="deny"
                                          onClick={e =>
                                            handlePtoRequest(e, id, index)
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
                        {pto && pto.pending ? (
                          <details>
                            <summary>
                              Pending Requests ({pto.pending.length})
                            </summary>
                            <ul>
                              {pto.pending.map((request, index) =>
                                typeof request.dates === "string" ? (
                                  <li key={index}>
                                    {request.dates} using {request.hours} hours.{" "}
                                    {request.type && (
                                      <span>- {request.type}</span>
                                    )}
                                  </li>
                                ) : (
                                  <li key={index}>
                                    {request.dates[0]} to {request.dates[1]}{" "}
                                    using {request.hours} hours.{" "}
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
                        {pto && pto.accepted ? (
                          <details>
                            <summary>
                              Accepted Requests ({pto.accepted.length})
                            </summary>
                            <ul>
                              {pto.accepted.map((request, index) =>
                                typeof request.dates === "string" ? (
                                  <li key={index}>
                                    {request.dates} using {request.hours} hours.{" "}
                                    {request.type && (
                                      <span>- {request.type}</span>
                                    )}
                                  </li>
                                ) : (
                                  <li key={index}>
                                    {request.dates[0]} to {request.dates[1]}{" "}
                                    using {request.hours} hours.{" "}
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
                        {pto && pto.denied ? (
                          <details>
                            <summary>
                              Denied Requests ({pto.denied.length})
                            </summary>
                            <ul>
                              {pto.denied.map((request, index) =>
                                typeof request.dates === "string" ? (
                                  <li key={index}>
                                    {request.dates} using {request.hours} hours.{" "}
                                    {request.type && (
                                      <span>- {request.type}</span>
                                    )}
                                  </li>
                                ) : (
                                  <li key={index}>
                                    {request.dates[0]} to {request.dates[1]}{" "}
                                    using {request.hours} hours.{" "}
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
                        onClick={() => handleSetEditing(id, name)}
                        className="modify-button"
                      >
                        {editing ? "Cancel" : "Edit"}
                      </button>
                      <DeleteUserForm id={id} />
                    </div>
                  </div>
                )
              }
            )
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
