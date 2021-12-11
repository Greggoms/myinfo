import React from "react"
import styled from "styled-components"

export const Notification = props => {
  return <NotificationContainer>{props.message}</NotificationContainer>
}

const NotificationContainer = styled.h2`
  margin: 0 auto;
  max-width: 960px;
  color: red;
`
