import React from "react"
import { GatsbySeo } from "gatsby-plugin-next-seo"
import { IndexPageContainer } from "../css"

const IndexPage = () => {
  return (
    <>
      <GatsbySeo nofollow={true} noindex={true} title="Home | AbbyHQ" />
      <IndexPageContainer className="page-container">
        <div className="page-content">
          <h2>New and Improved Employee Hub</h2>
          <div className="ctas">
            <div className="cta">
              <h2>Access Your Records</h2>
              <ul>
                <li>PTO Hours</li>
                <li>PTO Requests</li>
                <li>Insurance Status</li>
                <li>Hire Date</li>
              </ul>
            </div>
            <div className="cta">
              <h2>Find Documents</h2>
              <ul>
                <li>Employee Handbooks</li>
                <li>Direct Deposit</li>
                <li>W-4</li>
                <li>Insurance Opt-In Form</li>
              </ul>
            </div>
            <div className="cta">
              <h2>Stay Informed</h2>
              <ul>
                <li>Contact Emails</li>
                <li>Company Policies</li>
                <li>Product Adjustments</li>
              </ul>
            </div>
            <div className="cta">
              <h2>Browse Resources</h2>
              <ul>
                <li>IRS Tax Filing</li>
              </ul>
            </div>
            <h2
              style={{
                textAlign: "center",
                gridColumn: "1/-1",
                margin: "20px auto 5px",
              }}
            >
              Possible Future Features
            </h2>
            <div className="cta cta-special">
              <h2>Take Control</h2>
              <ul>
                <li>Request PTO from here!</li>
                <li>Send your Emails from here!</li>
                <li>Adjust your profile</li>
              </ul>
            </div>
          </div>
        </div>
      </IndexPageContainer>
    </>
  )
}

export default IndexPage
