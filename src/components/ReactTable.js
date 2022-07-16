import React, { useMemo } from "react"
import { useSelector } from "react-redux"
import { selectUsers } from "../app/features/usersSlice"
import { useSortBy, useTable } from "react-table"

import {
  getRemainingPto,
  daysUntil10Hrs,
  monthsWorked,
} from "../utils/dateHelpers"
import { TableContainer } from "../css"

export const ReactTable = () => {
  const users = useSelector(selectUsers)

  const data = useMemo(
    () =>
      users.map(
        ({
          name,
          location,
          position,
          hireDate,
          pay,
          pending,
          hoursUsed,
          insurance,
        }) => {
          // fname, lname, position, pay, getRemainingPto, Daysuntil, HireDate, insurance, location
          return {
            col1: name.split(" ")[0],
            col2: name.split(" ")[1],
            col3: position ? position : "No Position",
            col4: pay ? pay : "No Pay",
            col5: hireDate
              ? `${getRemainingPto(
                  hireDate.split("-")[0],
                  hireDate.split("-")[1],
                  hireDate.split("-")[2],
                  hoursUsed ? hoursUsed : 0,
                  pending
                )} hrs`
              : `No Hire Date`,
            col6: hireDate
              ? `${daysUntil10Hrs(
                  hireDate.split("-")[0],
                  hireDate.split("-")[1],
                  hireDate.split("-")[2]
                )} days`
              : `No Hire Date`,
            col7: hireDate ? hireDate : `No Hire Date`,
            col8: insurance
              ? "Opt-IN"
              : hireDate
              ? monthsWorked(
                  hireDate.split("-")[0],
                  hireDate.split("-")[1],
                  hireDate.split("-")[2]
                ) < 3
                ? "Not Eligible"
                : "Opt-OUT"
              : "No Hire Date",
            col9: location ? location : "No Location",
          }
        }
      ),
    // eslint-disable-next-line
    [users]
  )
  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "col1",
      },
      {
        Header: "Last Name",
        accessor: "col2",
      },
      {
        Header: "Position",
        accessor: "col3",
      },
      {
        Header: "Pay",
        accessor: "col4",
      },
      {
        Header: "PTO",
        accessor: "col5",
      },
      {
        Header: "+10hrs",
        accessor: "col6",
      },
      {
        Header: "Hire Date",
        accessor: "col7",
      },
      {
        Header: "Insurance",
        accessor: "col8",
      },
      {
        Header: "Location",
        accessor: "col9",
      },
    ],
    []
  )

  const tableInstance = useTable({ columns, data }, useSortBy)
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  return (
    // apply the table props
    <>
      <TableContainer {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map(headerGroup => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map(column => (
                    // Apply the header cell props
                    // Add the sorting props to control sorting. For this example
                    // we can add them into the header props
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      {/* Add a sort direction indicator */}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map(row => {
              // Prepare the row for display
              prepareRow(row)
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map(cell => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </TableContainer>
    </>
  )
}
