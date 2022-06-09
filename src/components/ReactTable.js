import React, { useMemo } from "react"
import { useSelector } from "react-redux"
import { selectUsers } from "../app/features/usersSlice"
import { useSortBy, useTable } from "react-table"

import { remainingPTO, daysUntil10Hrs, monthsWorked } from "../data/dateHelpers"
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
          const fullName = name.split(" ")
          const splitHireDate = hireDate ? hireDate.split("/") : ""
          // fname, lname, position, pay, remainingPTO, Daysuntil, HireDate, insurance, location
          return {
            col1: fullName[0],
            col2: fullName[1],
            col3: position ? position : "No Position",
            col4: pay ? pay : "No Pay",
            col5: hireDate
              ? `${remainingPTO(
                  splitHireDate[2],
                  splitHireDate[0],
                  splitHireDate[1],
                  hoursUsed ? hoursUsed : 0,
                  pending
                )} hrs`
              : `No Hire Date`,
            col6: hireDate
              ? `${daysUntil10Hrs(
                  splitHireDate[0],
                  splitHireDate[1],
                  splitHireDate[2]
                )} days`
              : `No Hire Date`,
            col7: hireDate
              ? `${splitHireDate[0]}/${splitHireDate[1]}/${splitHireDate[2]}`
              : `No Hire Date`,
            col8: insurance
              ? "Opt-IN"
              : hireDate
              ? monthsWorked(
                  splitHireDate[0],
                  splitHireDate[1],
                  splitHireDate[2]
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
