import * as React from "react"
import Profile from "./Profile"
import { data } from "./Database"
import Seo from "./seo"

export const Profiles = () => {
  return (
    <>
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
    </>
  )
}
