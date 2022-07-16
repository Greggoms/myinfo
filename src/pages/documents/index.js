import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbySeo } from "gatsby-plugin-next-seo"
import Button from "../../components/Button"
import { DocumentsPageContainer } from "../../css"

const DocumentsPage = () => {
  const documentsList = useStaticQuery(graphql`
    {
      allFile(filter: { ext: { eq: ".pdf" } }, sort: { fields: name }) {
        edges {
          node {
            publicURL
            name
            prettySize
            modifiedTime
          }
        }
      }
    }
  `)

  return (
    <>
      <GatsbySeo nofollow={true} noindex={true} title={`Documents | AbbyHQ`} />
      <h1 style={{ marginBottom: "20px", textAlign: "center" }}>Documents</h1>
      <DocumentsPageContainer>
        <div className="document-sections">
          <div className="document-section">
            <h2>For New Hires</h2>
            <ul>
              <li>W-4</li>
              <li>Millennium Enrollment</li>
              <li>Millennium Direct Deposit</li>
              <li>Insurance Enrollment</li>
              <li>Tobacco Server Awareness</li>
              <li>Employee Contact Info</li>
            </ul>
            <Button link="/documents/new-hire" text="View New Hire Documents" />
          </div>
          <div className="document-section">
            <h2>Policies</h2>
            <ul>
              <li>Acknowledgement Form</li>
              <li>Attendance</li>
              <li>Handbooks</li>
              <li>Holidays</li>
              <li>Inclement Weather</li>
              <li>Job Descriptions</li>
              <li>Pay Schedules</li>
              <li>PTO</li>
            </ul>
            <Button link="/documents/policies" text="View Policy Documents" />
          </div>
          <div className="document-section">
            <h2>Other</h2>
            <ul>
              <li>Cleaning Sheets</li>
              <li>Issue with the Drop</li>
              <li>Register Counts</li>
              <li>Return Forms</li>
              <li>Time Clock Corrections</li>
              <li>Who Do I Contact</li>
              <li>And More...</li>
            </ul>
            <Button link="/documents/other" text="View Other Documents" />
          </div>
        </div>
        <div className="doc-list">
          <h2>List of all Documents ({documentsList.allFile.edges.length})</h2>
          <div className="columns">
            <ul>
              <h3>New Hire & Other</h3>
              <hr />
              {documentsList.allFile.edges.map(doc => {
                if (
                  !doc.node.name.includes("Abby Road") &&
                  !doc.node.name.includes("Vapor World") &&
                  !doc.node.name.includes("Vapor House Distro") &&
                  !doc.node.name.includes("Wonderland")
                ) {
                  return (
                    <li key={doc.node.name}>
                      <a
                        href={doc.node.publicURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                      >
                        {doc.node.name}
                      </a>
                    </li>
                  )
                }
                return null
              })}
            </ul>
            <ul>
              <h3>Policies</h3>
              <hr />
              {documentsList.allFile.edges.map(doc => {
                if (
                  doc.node.name.includes("Abby Road") ||
                  doc.node.name.includes("Vapor World") ||
                  doc.node.name.includes("Vapor House Distro") ||
                  doc.node.name.includes("Wonderland")
                ) {
                  return (
                    <li key={doc.node.name}>
                      <a
                        href={doc.node.publicURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                      >
                        {doc.node.name}
                      </a>
                    </li>
                  )
                }
                return null
              })}
            </ul>
          </div>
        </div>
      </DocumentsPageContainer>
    </>
  )
}

export default DocumentsPage
