import React from "react"
import { data } from "./Database"
import { DashboardProfile } from "./DashboardProfile"
import { DashboardProfilesContainer } from "../elements"

export const DashboardProfiles = () => {
  return (
    <DashboardProfilesContainer>
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
            email,
            extraHours,
            pending,
            accepted,
          },
          index
        ) => {
          return (
            <DashboardProfile
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
              email={email}
              pending={pending}
              accepted={accepted}
            />
          )
        }
      )}
    </DashboardProfilesContainer>
  )
}
