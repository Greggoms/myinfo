import React from "react"
import Seo from "../components/seo"
import { PageNotFoundContainer } from "../elements"

const NotFoundPage = () => (
  <>
    <Seo title="404: Not found" />
    <PageNotFoundContainer>
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </PageNotFoundContainer>
  </>
)

export default NotFoundPage
