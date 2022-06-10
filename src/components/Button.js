import React from "react"
import { Link } from "gatsby"
import { ButtonLink } from "../css"

const Button = props => (
  <ButtonLink>
    <Link to={props.link}>
      {props.text}
      <p>{`>`}</p>
    </Link>
  </ButtonLink>
)

export default Button
