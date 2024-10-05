import React, { useState, useEffect } from "react";
import axios from "axios";

function RetrieveAllStaff() {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/staff/retrieve/")
      .then((response) => {
        setStaffList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        alert("Error Retrieving Staff List");
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="my-4">All Staff Members</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Surname</th>
            <th>Other Names</th>
            <th>Date of Birth</th>
            <th>Employee Number</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff, index) => (
            <tr key={index}>
              <td>{staff.surname}</td>
              <td>{staff.other_names}</td>
              <td>{staff.date_of_birth}</td>
              <td>{staff.employee_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RetrieveAllStaff;
