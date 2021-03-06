import React from "react"
import { useSelector } from "react-redux"
import { selectUsers } from "../../app/features/usersSlice"
import handlePtoRequest from "../../utils/handlePtoRequest"
import { UserDetailsContainer } from "../../css"
import { timeForReview, timeWorkedLong } from "../../utils/dateHelpers"
import { ModifyUserForm } from "./ModifyUserForm"

const UserDetails = props => {
  const users = useSelector(selectUsers)
  const user = users.find(user => props.params["*"] === user.id)
  if (!user) {
    return <p>Nothing Here...</p>
  } else {
    return (
      <UserDetailsContainer>
        <h2>{user.name}'s Page</h2>
        <div className="nothing-to-see">
          {(!user.pto ||
            !user.pto.submitted ||
            user.pto.submitted.length < 1) &&
          timeForReview(
            user.name,
            user.lastRaise,
            user.hireDate,
            user.position
          ) !== true ? (
            <h2>Nothing to see here</h2>
          ) : (
            <h2>Admin Action Needed!</h2>
          )}
        </div>
        <div className="action-needed">
          {user.pto && user.pto.submitted && user.pto.submitted.length > 0 && (
            <div className="action-needed__submitted">
              <h3>PTO Requests</h3>
              <ul>
                {user.pto.submitted.map((request, index) => (
                  <li key={index}>
                    <div className="request">
                      {typeof request.dates === "string" ? (
                        <div>
                          {request.dates} using {request.hours} hours.{" "}
                          {request.type && <span>- {request.type}</span>}
                        </div>
                      ) : (
                        <div>
                          {request.dates[0]} to {request.dates[1]} using{" "}
                          {request.hours} hours.{" "}
                          {request.type && <span>- {request.type}</span>}
                        </div>
                      )}
                      <div className="approve-deny">
                        <button
                          name="approve"
                          className="approve"
                          onClick={e =>
                            handlePtoRequest({
                              event: e,
                              user: user,
                              reqIndex: index,
                            })
                          }
                        >
                          Approve
                        </button>
                        <button
                          name="deny"
                          className="deny"
                          onClick={e =>
                            handlePtoRequest({
                              event: e,
                              user: user,
                              reqIndex: index,
                            })
                          }
                        >
                          Deny
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {timeForReview(
            user.name,
            user.lastRaise,
            user.hireDate,
            user.position
          ) === true && (
            <div className="action-needed__review">
              <h3>Review Needed!</h3>
              <p>
                {user.name} ({user.position}) has gone{" "}
                {user.lastRaise
                  ? timeWorkedLong(
                      user.lastRaise.split("-")[0],
                      user.lastRaise.split("-")[1],
                      user.lastRaise.split("-")[2]
                    )
                  : timeWorkedLong(
                      user.hireDate.split("-")[0],
                      user.hireDate.split("-")[1],
                      user.hireDate.split("-")[2]
                    )}{" "}
                without a review!
              </p>
              <p style={{ margin: "15px auto" }}>
                Update their info if this seems wrong
              </p>
              <ModifyUserForm id={user.id} />
            </div>
          )}
        </div>
      </UserDetailsContainer>
    )
  }
}

export default UserDetails
