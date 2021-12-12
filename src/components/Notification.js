import React from "react"
import { NotificationContainer } from "../elements"

export const Notification = props => {
  return <NotificationContainer>{props.message}</NotificationContainer>
}
