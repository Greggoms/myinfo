import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  approvePtoRequest,
  denyPtoRequest,
} from "../../app/features/usersSlice"
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore"
import { db } from "../../firebase/firebaseInit"
import { differenceInCalendarMonths } from "date-fns"
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
  currentYear,
  currentMonth,
  currentDay,
} from "../../data/dateHelpers"
import { DashboardButtonsContainer, DetailedUsersContainer } from "../../css"
import { toast } from "react-toastify"

export const UserListing = () => {
  const users = useSelector(state => state.users.value)
  const dispatch = useDispatch()

  const [filtered, setFiltered] = useState([])
  const [inputText, setInputText] = useState("")
  const [editing, setEditing] = useState(false)
  const [userId, setUserId] = useState("")

  useEffect(() => {
    setFiltered(users)
  }, [users])

  function filterUsersBySearch(e) {
    setInputText(e.target.value.toLowerCase())
    const filteredByInput = users.filter(employee => {
      //if no input the return the original
      if (inputText === "") {
        return employee
      }
      //return the item which contains the user input
      else {
        return employee.name.toLowerCase().includes(inputText)
      }
    })
    setFiltered(filteredByInput)
  }

  // <button> filter Function
  // https://codesandbox.io/s/r5x4i?file=/src/App.js:555-768
  function filterUsersByButton(e) {
    if (e.target.value === "reset") {
      setFiltered(users)
      setInputText("")
    } else if (e.target.value === "pending-pto") {
      const filterByPending = users.filter(user => {
        if (!user.pending) {
          return null
        } else {
          return user
        }
      })
      setFiltered(filterByPending)
    } else if (e.target.value === "raises") {
      const filterByRaise = users.filter(user => {
        if (!user.lastRaise) {
          console.log(`${user.name} has never been raised!`)
        }
        if (!user.hireDate) {
          console.log(`${user.name} has no hire date!`)
        }
        if (user.lastRaise || user.hireDate) {
          const result = differenceInCalendarMonths(
            new Date(currentYear, currentMonth, currentDay),
            new Date(
              user.lastRaise ? user.lastRaise[0] : user.hireDate[0],
              user.lastRaise ? user.lastRaise[1] : user.hireDate[1],
              user.lastRaise ? user.lastRaise[2] : user.hireDate[2]
            )
          )
          if (user.position === "Associate") {
            return result >= 3
          } else if (
            user.position === "Assist Mngr" ||
            user.position === "Manager"
          ) {
            return result >= 6
          }
        }
        return null
      })
      return setFiltered(filterByRaise)
    }
  }

  const searchbarStyles = {
    width: "100%",
    padding: "5px",
    margin: "0 auto 20px",
  }

  const handlePtoApproval = (e, id, index) => {
    const person = users.find(user => user.id === id)
    const userRef = doc(db, "users", person.id)
    if (e.target.id === "approve") {
      dispatch(
        approvePtoRequest({
          id: person.id,
          request: person.pto.submitted[index],
        })
      )
      async function approvePto() {
        await updateDoc(userRef, {
          "pto.submitted": arrayRemove(person.pto.submitted[index]),
          "pto.pending": arrayUnion(person.pto.submitted[index]),
        })
      }
      approvePto()
      toast.success(
        `${person.name}'s request for ${person.pto.submitted[index].dates} has been approved!`
      )
    } else {
      dispatch(
        denyPtoRequest({ id: person.id, request: person.pto.submitted[index] })
      )
      async function denyPto() {
        await updateDoc(userRef, {
          "pto.submitted": arrayRemove(person.pto.submitted[index]),
          "pto.denied": arrayUnion(person.pto.submitted[index]),
        })
      }
      denyPto()
      toast.info(`${person.name}'s request has been denied.`)
    }
  }

  const handleSetEditing = id => {
    setEditing(!editing)
    setUserId(id)
  }

  // Filter button info to be mapped later
  const buttons = [
    {
      name: "Reset",
      value: "reset",
    },
    {
      name: "Pending PTO",
      value: "pending-pto",
    },
    {
      name: "Due For Raise",
      value: "raises",
    },
  ]

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
      <DashboardButtonsContainer>
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
      </DashboardButtonsContainer>
      <DetailedUsersContainer>
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
                  <h3>{name}</h3>
                  <p>{email}</p>
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

                  <hr className="dashboard-hr" />

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
                      {lastRaise ? (
                        <div>
                          <span>Last Raise Date:</span>
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
                        <p>No raise given</p>
                      )}
                    </div>
                  </div>

                  <hr className="dashboard-hr" />

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

                  <hr className="dashboard-hr" />

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
                                        hours.
                                      </div>
                                    ) : (
                                      <div>
                                        {request.dates[0]} to {request.dates[1]}{" "}
                                        using {request.hours} hours.
                                      </div>
                                    )}
                                    <div className="approve-deny">
                                      <button
                                        id="approve"
                                        className="approve"
                                        onClick={e =>
                                          handlePtoApproval(e, id, index)
                                        }
                                      >
                                        Approve
                                      </button>
                                      <button
                                        id="deny"
                                        className="deny"
                                        onClick={e =>
                                          handlePtoApproval(e, id, index)
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
                        </details>
                      ) : (
                        <h5>No Denied Requests</h5>
                      )}
                    </div>
                  </div>
                  <div className="action-buttons">
                    <button
                      onClick={() => handleSetEditing(id)}
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
        ) : users.length === 0 ? (
          <h2>No users found! Sign someone up.</h2>
        ) : (
          <h3>Gathering Users...</h3>
        )}
        {editing && (
          <ModifyUserForm
            handleEditFunction={handleSetEditing}
            editing={editing}
            id={userId}
          />
        )}
      </DetailedUsersContainer>

      {filtered.length === 0 && <h3>No Match! Try another search.</h3>}
    </>
  )
}
