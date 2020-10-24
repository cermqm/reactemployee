import React from 'react'
import ReactDOM from 'react-dom';
import styled from 'styled-components'
import employees from "./data/employeedata.json";
import { useTable, useSortBy, useFilters, useGlobalFilter } from 'react-table'
import {matchSorter} from 'match-sorter'
import "./index.css";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val


function Table({ columns, data }) {

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    
  } = useTable({
    columns,
    data,
    defaultColumn, // Be sure to pass the defaultColumn option
    filterTypes
  },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy
  )

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>            
                ))}
          </tr>
        ))}
        <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: "left"
              }}
            >
            </th>
          </tr>
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}  id='employees' className={i}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()} id='employees'>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'Last',
            accessor: 'last_name',
          },
          {
            Header: 'First',
            accessor: 'first_name',
            disableFilters: true,
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Title',
            accessor: 'job_title',
          },
          {
            Header: 'Email',
            accessor: 'email',
            disableFilters: true,
          },
          {
            Header: 'Dept',
            accessor: 'department',
          },
          // {
          //   Header: '#',
          //   accessor: 'phonenumber',
          // },
          // {
          //   Header: 'Skill',
          //   accessor: 'linkedinskill',
          // },
        ],
      },
    ],
    []
  )

  return (
    <div>
      <h1 id='title'>Employee Directory</h1>
      <Styles>
        <Table columns={columns} data={employees} />
      </Styles>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));