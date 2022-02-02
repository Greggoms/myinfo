import React, { useMemo } from "react"
import { useSortBy, useTable } from "react-table"
import { EmployeesTable } from "../services/FireDatabase"
import { differenceInCalendarDays } from "date-fns"
import { TableContainer } from "../elements"

export const ReactTable = () => {
  const employeeList = EmployeesTable()

  const currentYear = new Date().getFullYear()
  const currentMonth = parseInt(new Date().getMonth() + 1)
  const currentDay = new Date().getDate()

  const lifetimePTO = (hireYear, hireMonth, hireDay) => {
    const result = differenceInCalendarDays(
      new Date(currentYear, currentMonth, currentDay),
      new Date(hireYear, hireMonth, hireDay)
    )
    return Math.floor(result / 91) * 10
  }
  const remainingPTO = (hireYear, hireMonth, hireDay, hoursUsed, pending) => {
    const result = differenceInCalendarDays(
      new Date(currentYear, currentMonth, currentDay),
      new Date(hireYear, hireMonth, hireDay)
    )
    return pending
      ? `${Math.floor(result / 91) * 10 - hoursUsed} - (${pending
          .map(({ hours }) => hours)
          .join(` + `)} Pending)`
      : Math.floor(result / 91) * 10 - hoursUsed
  }

  const daysUntil10Hrs = (hireYear, hireMonth, hireDay) => {
    const result = differenceInCalendarDays(
      new Date(currentYear, currentMonth, currentDay),
      new Date(hireYear, hireMonth, hireDay)
    )
    return 91 - (result % 91)
  }

  const data = useMemo(
    () =>
      employeeList.map(
        ({
          firstName,
          lastName,
          location,
          position,
          hireDate,
          pending,
          hoursUsed,
        }) => {
          return {
            col1: firstName,
            col2: lastName,
            col3: position,
            col4: location,
            col5: `${hireDate[0]}/${hireDate[1]}/${hireDate[2]}`,
            col6: lifetimePTO(hireDate[0], hireDate[1], hireDate[2]),
            col7: remainingPTO(
              hireDate[0],
              hireDate[1],
              hireDate[2],
              hoursUsed,
              pending
            ),
            col8: daysUntil10Hrs(hireDate[0], hireDate[1], hireDate[2]),
          }
        }
      ),
    // eslint-disable-next-line
    [employeeList]
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
        Header: "Location",
        accessor: "col4",
      },
      {
        Header: "Hire Date",
        accessor: "col5",
      },
      {
        Header: "Lifetime PTO",
        accessor: "col6",
      },
      {
        Header: "Remaining PTO",
        accessor: "col7",
      },
      {
        Header: "Days until +10hrs",
        accessor: "col8",
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
