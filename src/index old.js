import React from "react";
import ReactDOM from 'react-dom';
import employees from "./data/employeedata.json";
import "./index.css";
// import ReactTable from "react-table"; 
// import TableFilter from 'react-table-filter';



class Table extends React.Component {
 
    renderTableHeader() {
       let header = Object.keys(employees[0])
       return header.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>
       })
    }
 
    renderTableData() {
       return employees.map((employee, index) => {
          const { id, first_name, last_name, email, gender, job_title, manager } = employee //destructuring
          return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{first_name}</td>
                    <td>{last_name}</td>
                    <td>{email}</td>
                    <td>{gender}</td>
                    <td>{job_title}</td>
                    <td>{manager}</td>
                </tr>
          )
       })
    }
 
    render() {
       return (
          <div>
             <h1 id='title'>Employee Directory</h1>
             <table id='employees'>
                <tbody>
                   <tr>{this.renderTableHeader()}</tr>
                   {this.renderTableData()}
                </tbody>
             </table>
          </div>
       )
    }
 }
 
 ReactDOM.render(<Table />, document.getElementById('root'));