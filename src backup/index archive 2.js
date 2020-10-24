import React from "react";
import ReactDOM from 'react-dom';
import employees from "./data/employeedata.json";
import "./index.css";
import ReactTable from "react-table"; 

// import TableFilter from 'react-table-filter';

// function renderTableHeader() {
//     let header = Object.keys(employees[0])
//     return header.map((key, index) => {
//        return <th key={index}>{key.toUpperCase()}</th>
//     })
//  }

class Table extends React.Component {
    render() {
        return (  
            <div>  
                renderTableHeader()
                <ReactTable  
                    data={employees}  
                    defaultPageSize = {2}  
                    pageSizeOptions = {[2,4, 6]}  
                />  
            </div>        
        ) 
    }
}

 
 ReactDOM.render(<Table />, document.getElementById('root'));