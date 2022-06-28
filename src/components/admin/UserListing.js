import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { differenceInCalendarMonths, format } from "date-fns"
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
import {
  DashboardButtonsContainer,
  DetailedUsersContainer,
  MinimalDetailsContainer,
} from "../../css"

export const UserListing = () => {
  const users = useSelector(state => state.users.value)

  const [filtered, setFiltered] = useState([])
  const [inputText, setInputText] = useState("")
  const [minimalDetails, setMinimalDetails] = useState(true)
  const [allDetails, setAllDetails] = useState(false)

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

  const handleLayoutSelection = e => {
    if (e.target.value === "all") {
      setAllDetails(true)
      setMinimalDetails(false)
    } else if (e.target.value === "minimal") {
      setMinimalDetails(true)
      setAllDetails(false)
    }
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

  const buttonStyles = {
    active: {
      background: "inherit",
      border: `2px solid #09A603`,
      color: "#F2F2F2",
    },
    inactive: {},
  }

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
        <h3>Layout</h3>
        <div className="details">
          <button
            onClick={handleLayoutSelection}
            value="minimal"
            type="button"
            style={minimalDetails ? buttonStyles.active : buttonStyles.inactive}
          >
            Minimal
          </button>
          <button
            onClick={handleLayoutSelection}
            value="all"
            type="button"
            style={allDetails ? buttonStyles.active : buttonStyles.inactive}
          >
            Detailed
          </button>
        </div>
      </DashboardButtonsContainer>
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
      {allDetails && (
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
                promotionDate,
                lastRaise,
                position,
                location,
                hoursUsed,
                pending,
                accepted,
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
                        <p>{insurance === "true" ? "Opt-IN" : "Opt-OUT"}</p>
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
                                hireDate.split("/")[2],
                                hireDate.split("/")[0],
                                hireDate.split("/")[1]
                              )}{" "}
                              months ago
                            </span>
                          </div>
                        ) : (
                          <p>No hire date</p>
                        )}
                      </div>
                    </div>

                    <hr className="dashboard-hr" />

                    <div className="pto-numbers">
                      {hireDate ? (
                        <p>
                          {remainingPTO(
                            hireDate.split("/")[2],
                            hireDate.split("/")[0],
                            hireDate.split("/")[1],
                            hoursUsed ? hoursUsed : 0,
                            pending ? pending : null
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
                            hireDate.split("/")[2],
                            hireDate.split("/")[0],
                            hireDate.split("/")[1]
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
                        {pending ? (
                          <details>
                            <summary>
                              Pending Requests ({pending.length})
                            </summary>
                            <ul>
                              {pending.map((request, index) =>
                                request.dates.length > 1 ? (
                                  <li key={index}>
                                    {request.dates[0]} to {request.dates[1]}{" "}
                                    using {request.hours} hours.
                                  </li>
                                ) : (
                                  <li key={index}>
                                    {request.dates} using {request.hours} hours.
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
                        {accepted ? (
                          <details>
                            <summary>
                              Accepted Requests ({accepted.length})
                            </summary>
                            <ul>
                              {accepted.map((request, index) =>
                                request.dates.length > 1 ? (
                                  <li key={index}>
                                    {request.dates[0]} to {request.dates[1]}{" "}
                                    using {request.hours} hours.
                                  </li>
                                ) : (
                                  <li key={index}>
                                    {request.dates} using {request.hours} hours.
                                  </li>
                                )
                              )}
                            </ul>
                          </details>
                        ) : (
                          <h5>No Accepted Requests</h5>
                        )}
                      </div>
                    </div>
                    <div className="action-buttons">
                      <ModifyUserForm id={id} />
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
        </DetailedUsersContainer>
      )}
      {minimalDetails && (
        <MinimalDetailsContainer>
          {users !== undefined && users.length >= 1 ? (
            filtered.map(
              ({ id, name, email, pay, position, location, pending }) => (
                <div className="user" key={id}>
                  <h3>{name}</h3>
                  <div>
                    <p>{location}</p>
                    <p>{position}</p>
                    <p>${pay}</p>
                  </div>

                  <div className="info request">
                    {pending ? (
                      <details>
                        <summary>Pending Requests ({pending.length})</summary>
                        <ul>
                          {pending.map((request, index) =>
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
                      </details>
                    ) : (
                      <h5>No Pending Requests</h5>
                    )}
                  </div>

                  <div className="action-buttons">
                    <ModifyUserForm id={id} />
                    <DeleteUserForm id={id} />
                  </div>
                </div>
              )
            )
          ) : users.length === 0 ? (
            <h2>No users found! Sign someone up.</h2>
          ) : (
            <h3>Gathering Users...</h3>
          )}
        </MinimalDetailsContainer>
      )}

      {filtered.length === 0 && <h3>No Match! Try another search.</h3>}
    </>
  )
}
