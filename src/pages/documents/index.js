import React, { useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbySeo } from "gatsby-plugin-next-seo"
import Button from "../../components/Button"
import { DocumentsPageContainer } from "../../css"

const DocumentsPage = () => {
  useEffect(() => {
    if (window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }, [])

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
            <h2>New Hires</h2>
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
          <h2>List of all Documents</h2>
          <ul>
            {documentsList.allFile.edges.map(doc => (
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
            ))}
          </ul>
        </div>
      </DocumentsPageContainer>
    </>
  )
}

export default DocumentsPage