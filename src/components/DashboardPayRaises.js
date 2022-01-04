import React from "react"
import { data } from "./Database"
import { DashboardPayRaise } from "./DashboardPayRaise"
import { DashboardProfilesContainer } from "../elements"

export const DashboardPayRaises = () => {
  return (
    <DashboardProfilesContainer>
      {data.map(
        (
          {
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
          },
          index
        ) => {
          return (
            timeForRaise === true &&
            pay.toString() < eligible && (
              <DashboardPayRaise
                key={index}
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
