import React from "react";
// import './App.css';
import data from "./data/employeedata.json";
// import {JsonTable} from 'react-json-table';
// var createReactClass = require('create-react-class');




// const employeedata = data.map((data) => {
//   // console.log(data.first_name);
//   // console.log(data);
//   return {data}
// });

function App() { 

  const employeedata = data.map((data) => {
    return {data}
  })

  // const employeedata = [
  //   {"id":1,"first_name":"Chip","last_name":"Bockman","email":"cbockman0@independent.co.uk","gender":"Male","job_title":"Quality Engineer","socialsecurity#":"211-41-8180","manager":"Chip Bockman"},
  // ]  

  console.log(employeedata);
  console.log(employeedata[0].data.first_name);

    return (

      // React.render(<JsonTable rows={ employeedata } />, document.body)

      // employeedata.forEach(i => {
        <div>
          <p>First Name - </p>
        </div>
      // })
    );
  }

export default App;
