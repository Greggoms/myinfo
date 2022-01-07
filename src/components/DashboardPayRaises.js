import React from "react"
import { data } from "./Database"
import { DashboardPayRaise } from "./DashboardPayRaise"
import { DashboardProfilesContainer } from "../elements"

export const DashboardPayRaises = () => {
  return (
    <DashboardProfilesContainer>
      {data.map(
        ({
          id,
          firstName,
          lastName,
          location,
          hireDate,
          position,
          email,
          monthsWorked,
          promotionDate,
          timeForRaise,
          pay,
          eligible,
        }) => {
          return (
            timeForRaise === true &&
            pay.toString() < eligible && (
              <DashboardPayRaise
                key={id}
                id={id}
                firstName={firstName}
                lastName={lastName}
                location={location}
                hireDate={hireDate}
                position={position}
                email={email}
                monthsWorked={monthsWorked}
                promotionDate={promotionDate}
                timeForRaise={timeForRaise}
                pay={pay}
                eligible={eligible}
              />
            )
          )
        }
      )}
    </DashboardProfilesContainer>
  )
}
