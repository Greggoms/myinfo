import React, { useState } from "react"
import { GatsbySeo } from "gatsby-plugin-next-seo"

import SharedPolicies from "../../components/policies/SharedPolicies"
import AbbyroadPolicies from "../../components/policies/AbbyroadPolicies"
import VaporworldPolicies from "../../components/policies/VaporworldPolicies"
import WonderlandPolicies from "../../components/policies/WonderlandPolicies"
import VhdPolicies from "../../components/policies/VhdPolicies"
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"
import { PoliciesContainer } from "../../css"

const PolicyDocumentsPage = () => {
  const [vaporworld, setVaporworld] = useState(false)
  const [abbyroad, setAbbyroad] = useState(false)
  const [wonderland, setWonderland] = useState(false)
  const [vhd, setVhd] = useState(false)

  const handleCompanySelect = e => {
    if (e.target.textContent === "Vapor World") {
      setAbbyroad(false)
      setWonderland(false)
      setVhd(false)
      setVaporworld(true)
    } else if (e.target.textContent === "Abby Road") {
      setVaporworld(false)
      setWonderland(false)
      setVhd(false)
      setAbbyroad(true)
    } else if (e.target.textContent === "Wonderland") {
      setAbbyroad(false)
      setVaporworld(false)
      setVhd(false)
      setWonderland(true)
    } else if (e.target.textContent === "Vapor House Distro") {
      setAbbyroad(false)
      setVaporworld(false)
      setWonderland(false)
      setVhd(true)
    }
  }

  return (
    <>
      <GatsbySeo
        nofollow={true}
        noindex={true}
        title={`Policy Documents | AbbyHQ`}
      />
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Policies</h1>
      <PoliciesContainer>
        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          Please select your company
        </p>
        <div className="button-container">
          <button onClick={handleCompanySelect}>Vapor World</button>
          <button onClick={handleCompanySelect}>Abby Road</button>
          <button onClick={handleCompanySelect}>Wonderland</button>
          <button onClick={handleCompanySelect}>Vapor House Distro</button>
        </div>
        {abbyroad && (
          <div>
            <h2>Abby Road Policies</h2>
            <AbbyroadPolicies />
          </div>
        )}
        {vaporworld && (
          <div>
            <h2>Vapor World Policies</h2>
            <VaporworldPolicies />
          </div>
        )}
        {wonderland && (
          <div>
            <h2>Wonderland Policies</h2>
            <WonderlandPolicies />
          </div>
        )}
        {vhd && (
          <div>
            <h2>Vapor House Distro Policies</h2>
            <VhdPolicies />
          </div>
        )}
        <div className="policies-shared">
          <h2>Shared Policies</h2>
          <SharedPolicies />
          <hr />
        </div>
      </PoliciesContainer>
    </>
  )
}

export default PolicyDocumentsPage
