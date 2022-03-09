import React from "react"
import Seo from "../components/seo"
import { ContactContainer } from "../elements"
import { ContactForm } from "../components/ContactForm"

const contact = () => {
  return (
    <>
      <Seo title="Contact" />
      <ContactContainer>
        <ContactForm />
      </ContactContainer>
    </>
  )
}

export default contact
