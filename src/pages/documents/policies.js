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
import { StaticImage } from "gatsby-plugin-image"

const PolicyDocumentsPage = () => {
  const [vaporworld, setVaporworld] = useState(false)
  const [abbyroad, setAbbyroad] = useState(false)
  const [wonderland, setWonderland] = useState(false)
  const [vhd, setVhd] = useState(false)

  const handleCompanySelect = ({ value }) => {
    if (value === "Vapor World") {
      setAbbyroad(false)
      setWonderland(false)
      setVhd(false)
      setVaporworld(true)
    } else if (value === "Abby Road") {
      setVaporworld(false)
      setWonderland(false)
      setVhd(false)
      setAbbyroad(true)
    } else if (value === "Wonderland") {
      setAbbyroad(false)
      setVaporworld(false)
      setVhd(false)
      setWonderland(true)
    } else if (value === "Vapor House Distro") {
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
        <div className="image-list">
          <button onClick={() => handleCompanySelect({ value: "Vapor World" })}>
            <StaticImage
              src="../../images/logos/vaporworld_logo.png"
              alt="Vapor World Logo"
              onClick={() => handleCompanySelect({ value: "Vapor World" })}
            />
          </button>
          <button onClick={() => handleCompanySelect({ value: "Abby Road" })}>
            {" "}
            <StaticImage
              src="../../images/logos/abbyroad_logo.png"
              alt="Abby Road Logo"
            />
          </button>
          <button onClick={() => handleCompanySelect({ value: "Wonderland" })}>
            {" "}
            <StaticImage
              src="../../images/logos/wonderland_logo.png"
              alt="Wonderland Logo"
            />
          </button>
          <button
            onClick={() => handleCompanySelect({ value: "Vapor House Distro" })}
          >
            {" "}
            <StaticImage
              src="../../images/logos/vaporhousedistro_logo.png"
              alt="Vapor House Distro Logo"
            />
          </button>
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
