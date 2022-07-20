import React, { useMemo, useState } from "react"
import { useSelector } from "react-redux/es/exports"
import { selectUsers } from "../app/features/usersSlice"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  daysUntil10Hrs,
  getRemainingPto,
  monthsWorked,
} from "../utils/dateHelpers"
import { TableContainer, TableToggleContainer } from "../css"

function ReactTableV8() {
  const users = useSelector(selectUsers)
  const [sorting, setSorting] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})

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
            firstName: name.split(" ")[0],
            lastName: name.split(" ")[1],
            position: position ? position : "No Position",
            pay: pay ? pay : "No Pay",
            pto: hireDate
              ? `${getRemainingPto(
                  hireDate.split("-")[0],
                  hireDate.split("-")[1],
                  hireDate.split("-")[2],
                  hoursUsed ? hoursUsed : 0,
                  pending
                )} hrs`
              : `No Hire Date`,
            "+10hrs": hireDate
              ? `${daysUntil10Hrs(
                  hireDate.split("-")[0],
                  hireDate.split("-")[1],
                  hireDate.split("-")[2]
                )} days`
              : `No Hire Date`,
            hireDate: hireDate ? hireDate : `No Hire Date`,
            insurance: insurance
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
            location: location ? location : "No Location",
          }
        }
      ),
    // eslint-disable-next-line
    [users]
  )
  const columns = useMemo(
    () => [
      {
        header: "First Name",
        accessorKey: "firstName",
      },
      {
        header: "Last Name",
        accessorKey: "lastName",
      },
      {
        header: "Position",
        accessorKey: "position",
      },
      {
        header: "Pay",
        accessorKey: "pay",
      },
      {
        header: "PTO",
        accessorKey: "pto",
      },
      {
        header: "+10hrs",
        accessorKey: "+10hrs",
      },
      {
        header: "Hire Date",
        accessorKey: "hireDate",
      },
      {
        header: "Insurance",
        accessorKey: "insurance",
      },
      {
        header: "Location",
        accessorKey: "location",
      },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  })

  const checkedStyles = {
    active: {
      border: `2px solid #00DEF2`,
    },
    inactive: {
      border: `2px solid #8C8C8C`,
      color: `#8C8C8C`,
    },
  }

  return (
    <>
      <TableToggleContainer>
        <h3>Show/Hide Columns</h3>
        <div className="label-list">
          <label className="toggle-all">
            <input
              {...{
                type: "checkbox",
                checked: table.getIsAllColumnsVisible(),
                onChange: table.getToggleAllColumnsVisibilityHandler(),
              }}
            />{" "}
            <p>Toggle All</p>
          </label>
          {table.getAllLeafColumns().map(column => {
            return (
              <label
                key={column.id}
                style={
                  column.getIsVisible()
                    ? checkedStyles.active
                    : checkedStyles.inactive
                }
              >
                <input
                  {...{
                    type: "checkbox",
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />{" "}
                <p>{column.id}</p>
              </label>
            )
          })}
        </div>
      </TableToggleContainer>
      <TableContainer>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </TableContainer>
    </>
  )
}

export default ReactTableV8
