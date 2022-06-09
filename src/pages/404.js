import React from "react"
import { GatsbySeo } from "gatsby-plugin-next-seo"
import { PageNotFoundContainer } from "../css"

const NotFoundPage = () => (
  <>
    <GatsbySeo nofollow={true} noindex={true} title="404: Not found | AbbyHQ" />
    <PageNotFoundContainer>
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </PageNotFoundContainer>
  </>
)

export default NotFoundPage
