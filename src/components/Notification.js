import React from "react"
import { NotificationContainer } from "../css"

export const Notification = props => {
  return <NotificationContainer>{props.message}</NotificationContainer>
}
