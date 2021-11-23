import * as React from "react"
import { Profile } from "../components/Profile"
import { data } from "../components/Database"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ProfilePage = () => {
  return (
    <Layout>
      <Seo title="Your Profile" />
      {data.map(
        (
          {
            firstName,
            lastName,
            location,
            hireDate,
            lifetimePTO,
            remainingPTO,
            daysUntil10Hrs,
            position,
            extraHours,
          },
          index
        ) => {
          return (
            <Profile
              key={index}
              firstName={firstName}
              lastName={lastName}
              location={location}
              hireDate={hireDate}
              lifetimePTO={lifetimePTO}
              remainingPTO={remainingPTO}
              daysUntil10Hrs={daysUntil10Hrs}
              position={position}
              extraHours={extraHours}
            />
          )
        }
      )}
    </Layout>
  )
}

export default ProfilePage
