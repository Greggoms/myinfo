import React from "react"
import { differenceInCalendarDays } from "date-fns"
import { Database } from "./Database"
import styled from "styled-components"

export const Table = () => {
  const year = new Date().getFullYear()
  const month = parseInt(new Date().getMonth() + 1)
  const day = new Date().getDate()

  return (
    <TableContainer>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Location</th>
          <th>Hire Date (yyyy/m/dd)</th>
          <th>Lifetime PTO Hours</th>
          <th>Remaining PTO Hours</th>
          <th>Days until +10hrs</th>
        </tr>
      </thead>
      <tbody>
        {Database.map(
          (
            { name, hireDate, hoursUsed, extraHours, location, position },
            index
          ) => {
            const result = differenceInCalendarDays(
              new Date(year, month, day),
              new Date(hireDate[0], hireDate[1], hireDate[2])
            )

            return (
              <tr key={index}>
                <td>
                  {(position === "Manager" && <strong>{name}</strong>) ||
                    (position === "Assistant Manager" && `${name}*`) ||
                    (position === "Associate" && name)}
                </td>
                <td>{location}</td>
                <td>{`${hireDate[0]}/${hireDate[1]}/${hireDate[2]}`}</td>
                <td>{Math.floor(result / 91) * 10}</td>
                <td>
                  {extraHours
                    ? Math.floor(result / 91) * 10 - hoursUsed + extraHours
                    : Math.floor(result / 91) * 10 - hoursUsed}
                </td>
                <td>{91 - (result % 91)}</td>
              </tr>
            )
          }
        )}
      </tbody>
    </TableContainer>
  )
}

const TableContainer = styled.table`
  width: 100%;
  max-width: 105rem;
  margin: 0 auto;

  tbody tr:nth-child(odd) {
    background: #eee;
  }

  th,
  td {
    padding: 0.5rem 1.5rem !important;
  }
`
