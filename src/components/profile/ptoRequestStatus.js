import React from "react"
import { useSelector } from "react-redux"
import { selectUserFireDoc } from "../../app/features/userSlice"
import { PtoStatusContainer } from "../../css"

const PtoRequestStatus = () => {
  const userFireDoc = useSelector(selectUserFireDoc)
  return (
    <PtoStatusContainer>
      <div className="request">
        {userFireDoc.pto &&
        userFireDoc.pto.submitted &&
        userFireDoc.pto.submitted.length >= 1 ? (
          <div>
            <h2>Submitted Requests ({userFireDoc.pto.submitted.length})</h2>
            <ul>
              {userFireDoc.pto.submitted.map((request, index) => {
                if (typeof request.dates === "string") {
                  return (
                    <li key={index}>
                      <p>
                        {request.dates} using {request.hours} hours.
                      </p>
                      {request.type && <span>{request.type}</span>}
                    </li>
                  )
                } else {
                  return (
                    <li key={index}>
                      <p>
                        {request.dates[0]} to {request.dates[1]} using{" "}
                        {request.hours} hours.
                      </p>
                      {request.type && <span>{request.type}</span>}
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
                    <p>
                      {request.dates} using {request.hours} hours.
                    </p>
                    {request.type && <span>{request.type}</span>}
                  </li>
                ) : (
                  <li key={index}>
                    <p>
                      {request.dates[0]} to {request.dates[1]} using{" "}
                      {request.hours} hours.
                    </p>
                    {request.type && <span>{request.type}</span>}
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
                    <p>
                      {request.dates[0]} to {request.dates[1]} using{" "}
                      {request.hours} hours.
                    </p>
                    {request.type && <span>{request.type}</span>}
                  </li>
                ) : (
                  <li key={index}>
                    <p>
                      {request.dates} using {request.hours} hours.
                    </p>
                    {request.type && <span>{request.type}</span>}
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
                    <p>
                      {request.dates} using {request.hours} hours.
                    </p>
                    {request.type && <span>{request.type}</span>}
                  </li>
                ) : (
                  <li key={index}>
                    <p>
                      {request.dates[0]} to {request.dates[1]} using{" "}
                      {request.hours} hours.
                    </p>
                    {request.type && <span>{request.type}</span>}
                  </li>
                )
              )}
            </ul>
          </div>
        ) : (
          <p>No Denied Requests</p>
        )}
      </div>
    </PtoStatusContainer>
  )
}

export default PtoRequestStatus
