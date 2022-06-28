import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbySeo } from "gatsby-plugin-next-seo"
import { format } from "date-fns"
import { Viewer, Worker } from "@react-pdf-viewer/core"
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"

import { DocumentsContainer } from "../../css/DocumentsStyles"
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"

const OtherDocumentsPage = () => {
  const otherDocuments = useStaticQuery(graphql`
    {
      allFile(
        filter: { sourceInstanceName: { eq: "pdfsother" } }
        sort: { fields: name }
      ) {
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

  // This allows for multiple instances of Viewer.
  // Not currently using the full functionality, but I'm
  // keeping this for when I do.
  const ViewerWrapper = ({ fileUrl }) => {
    // This plugin gives the pdfs functionality, but it is
    // not being used because the pdf preview acts as an image link.
    // eslint-disable-next-line
    const defaultLayoutPluginInstance = defaultLayoutPlugin()
    return <Viewer fileUrl={fileUrl} theme="dark" plugins={[]} />
  }
  return (
    <>
      <GatsbySeo
        nofollow={true}
        noindex={true}
        title={`Other Documents | AbbyHQ`}
      />
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Other Documents
      </h1>
      <DocumentsContainer>
        {otherDocuments.allFile.edges.map((file, index) => {
          return (
            <div className="document" key={`pdf-${index}`}>
              <div className="pdf-container">
                <a
                  href={file.node.publicURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.js">
                    <ViewerWrapper fileUrl={file.node.publicURL} />
                  </Worker>
                  {file.node.name}
                </a>
              </div>
              <div className="document-info">
                <p>
                  {file.node.prettySize} - Last Modified:{" "}
                  {format(new Date(file.node.modifiedTime), `PPPP`)}
                </p>
              </div>
            </div>
          )
        })}
      </DocumentsContainer>
    </>
  )
}

export default OtherDocumentsPage
