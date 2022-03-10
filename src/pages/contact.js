import React from "react"
import { GatsbySeo } from "gatsby-plugin-next-seo"
import { ContactContainer } from "../elements"
import { ContactForm } from "../components/ContactForm"

const contact = () => {
  return (
    <>
      <GatsbySeo nofollow={true} noindex={true} title="Contact | vwLogin" />
      <ContactContainer>
        <ContactForm />
      </ContactContainer>
    </>
  )
}

export default contact
