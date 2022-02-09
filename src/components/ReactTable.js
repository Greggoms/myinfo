import React, { useState, useEffect, useMemo } from "react"
import { getFirestore, collection, getDocs, query } from "firebase/firestore"
import { useSortBy, useTable } from "react-table"
import { differenceInCalendarDays } from "date-fns"
import { TableContainer } from "../elements"

export const ReactTable = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const db = getFirestore()
    async function getUsers() {
      const q = query(collection(db, "users"))

      const querySnapshot = await getDocs(q)
      setUsers(querySnapshot.docs.map(res => res.data()))
    }
    getUsers()
  }, [])

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
      users.map(
        ({ name, location, position, hireDate, pending, hoursUsed }) => {
          return {
            col1: name,
            col2: position ? position : "No Position",
            col3: location ? location : "No Location",
            col4: hireDate
              ? `${hireDate[0]}/${hireDate[1]}/${hireDate[2]}`
              : `No Hire Date`,
            col5: hireDate
              ? lifetimePTO(hireDate[0], hireDate[1], hireDate[2])
              : `No Hire Date`,
            col6: hireDate
              ? remainingPTO(
                  hireDate[0],
                  hireDate[1],
                  hireDate[2],
                  hoursUsed ? hoursUsed : 0,
                  pending
                )
              : `No Hire Date`,
            col7: hireDate
              ? daysUntil10Hrs(hireDate[0], hireDate[1], hireDate[2])
              : `No Hire Date`,
          }
        }
      ),
    // eslint-disable-next-line
    [users]
  )
  const columns = useMemo(
    () => [
      {
        Header: "Full Name",
        accessor: "col1",
      },
      {
        Header: "Position",
        accessor: "col2",
      },
      {
        Header: "Location",
        accessor: "col3",
      },
      {
        Header: "Hire Date",
        accessor: "col4",
      },
      {
        Header: "Lifetime PTO",
        accessor: "col5",
      },
      {
        Header: "Remaining PTO",
        accessor: "col6",
      },
      {
        Header: "Days until +10hrs",
        accessor: "col7",
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
