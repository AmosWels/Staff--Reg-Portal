import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RetrieveAllStaff() {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const postData = {
      employee_number: "",
      unique_code: "dfcu2024ex",
    };
    axios
      .post("http://localhost:8000/api/staff/retrieve/", postData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setStaffList(response.data);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.error || "Error Retrieving Staff List";
        alert(errorMessage);
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="my-4">All Staff Members</h2>
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Back Home
      </button><br></br><br></br>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>No.</th>
            <th>Surname</th>
            <th>Other Names</th>
            <th>Date of Birth</th>
            <th>Employee Number</th>
            <th>Unique Code</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff, index) => (
            <tr key={index}>
              <td>{index + 1}.</td>
              <td>{staff.surname}</td>
              <td>{staff.other_names}</td>
              <td>{staff.date_of_birth}</td>
              <td>{staff.employee_number}</td>
              <td>{staff.unique_code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RetrieveAllStaff;
