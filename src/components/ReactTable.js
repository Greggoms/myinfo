import React, { useState, useEffect, useMemo } from "react"
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore"
import { useSortBy, useTable } from "react-table"
import { differenceInCalendarDays, differenceInCalendarMonths } from "date-fns"
import { TableContainer } from "../elements"

export const ReactTable = () => {
  const [users, setUsers] = useState([])
  const db = getFirestore()

  useEffect(() => {
    try {
      async function getUsers() {
        const q = query(collection(db, "users"), orderBy("hireDate", "desc"))

        const querySnapshot = await getDocs(q)
        setUsers(querySnapshot.docs.map(res => res.data()))
      }
      getUsers()
    } catch (err) {
      console.log("ERROR: ", err)
    }
    // eslint-disable-next-line
  }, [])

  const currentYear = new Date().getFullYear()
  const currentMonth = parseInt(new Date().getMonth() + 1)
  const currentDay = new Date().getDate()

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

  const monthsWorked = (year, month, day) => {
    const result = differenceInCalendarMonths(
      new Date(currentYear, currentMonth, currentDay),
      new Date(year, month, day)
    )
    return result
  }

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
          // fname, lname, position, pay, remainingPTO, Daysuntil, HireDate, insurance, location
          return {
            col1: fullName[0],
            col2: fullName[1],
            col3: position ? position : "No Position",
            col4: pay ? pay : "No Pay",
            col5: hireDate
              ? `${remainingPTO(
                  hireDate[0],
                  hireDate[1],
                  hireDate[2],
                  hoursUsed ? hoursUsed : 0,
                  pending
                )} hrs`
              : `No Hire Date`,
            col6: hireDate
              ? `${daysUntil10Hrs(hireDate[0], hireDate[1], hireDate[2])} days`
              : `No Hire Date`,
            col7: hireDate
              ? `${hireDate[0]}/${hireDate[1]}/${hireDate[2]}`
              : `No Hire Date`,
            col8: insurance
              ? "Yes"
              : hireDate &&
                monthsWorked(hireDate[0], hireDate[1], hireDate[2]) < 3
              ? "Not Eligible"
              : "No",
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
