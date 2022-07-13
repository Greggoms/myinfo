import React from "react"
import Svg from "../svg/lock.svg"
import { NotificationContainer } from "../css"

export const Notification = ({ children, ...props }) => {
  return (
    <NotificationContainer>
      <h2>{children}</h2>
      {props.lock && (
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
      )}
    </NotificationContainer>
  )
}
