import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { format } from "date-fns"
import { Viewer, Worker } from "@react-pdf-viewer/core"
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"

import { DocumentsContainer } from "../../css"

const VaporworldPolicies = () => {
  const vaporworldPolicies = useStaticQuery(graphql`
    {
      allFile(
        filter: { sourceInstanceName: { eq: "pdfspoliciesvaporworld" } }
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
    <DocumentsContainer>
      {vaporworldPolicies.allFile.edges.map((file, index) => {
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
  )
}

export default VaporworldPolicies
