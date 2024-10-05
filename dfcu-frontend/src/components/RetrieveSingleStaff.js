import React, { useState } from "react";
import axios from "axios";

function RetrieveSingleStaff() {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [staff, setStaff] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://localhost:8000/api/staff/retrieve/?employee_number=${employeeNumber}`
      )
      .then((response) => {
        setStaff(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        alert("Error Retrieving Staff");
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h2 className="my-4">Retrieve Staff by Employee Number</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee Number</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setEmployeeNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Retrieve Staff
        </button>
      </form>

      {staff && (
        <div className="mt-4">
          <h3>Staff Details</h3>
          <p>
            <strong>Surname:</strong> {staff.surname}
          </p>
          <p>
            <strong>Other Names:</strong> {staff.other_names}
          </p>
          <p>
            <strong>Date of Birth:</strong> {staff.date_of_birth}
          </p>
          <img
            src={`data:image/jpeg;base64,${staff.id_photo}`}
            alt="Staff ID"
          />
        </div>
      )}
    </div>
  );
}

export default RetrieveSingleStaff;
