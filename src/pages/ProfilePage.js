import * as React from "react"
import { Link } from "gatsby"
import { Profile } from "../components/Profile"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ProfilePage = () => (
  <Layout>
    <Seo title="Profile" />
    <Link to="/">Go back to the homepage</Link>
    <Profile />
  </Layout>
)

export default ProfilePage
