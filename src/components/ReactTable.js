import React from "react"
import { useTable, useSortBy } from "react-table"
import styled from "styled-components"
import { columns, data } from "./Database"

export const ReactTable = () => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy)

  return (
    <TableContainer {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              // Add the sorting props to control sorting. For this example
              // we can add them into the header props
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                {/* Add a sort direction indicator */}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)

          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </TableContainer>
  )
}

const TableContainer = styled.table`
  width: 100%;
  max-width: 105rem;
  margin: 3rem 0 auto;

  tbody tr:nth-child(odd) {
    background: #eee;
  }

  th {
    border-top: 1px solid #333;
    border-left: 1px solid #333;
  }

  th:last-child {
    border-right: 1px solid #333;
  }

  th,
  td {
    padding: 0.5rem 1.5rem !important;
  }
`
