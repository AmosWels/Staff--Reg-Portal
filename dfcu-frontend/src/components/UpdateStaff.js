import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateStaff() {
  const navigate = useNavigate();
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [uniqueCode, setUniqueCode] = useState("");
  const [formData, setFormData] = useState({
    unique_code: "",
    surname: "",
    other_names: "",
    date_of_birth: "",
    id_photo: "",
    employee_number: "",
  });
  const [staff, setStaff] = useState(null);

  const handleRetrieve = (e) => {
    e.preventDefault();
    const postData = {
      employee_number: employeeNumber,
      unique_code: uniqueCode,
    };

    axios
      .post("http://localhost:8000/api/staff/retrieve/", postData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (
          typeof response.data !== "object" ||
          response.data === null ||
          Array.isArray(response.data)
        ) {
          alert("Warning: Please provide a valid employee ID.");
        } else {
          setStaff(response.data);
          setFormData(response.data);
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.error || "Error Retrieving Staff";
        alert(errorMessage);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      employee_number: formData.employee_number,
      unique_code: formData.unique_code,
      surname: formData.surname,
      other_names: formData.other_names,
      id_photo: formData.id_photo,
      date_of_birth: formData.date_of_birth,
    };

    axios
      .patch(
        `http://localhost:8000/api/staff/update/`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        alert("Staff Updated Successfully");
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.error || "Error Updating Staff";
        alert(errorMessage);
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h2 className="my-4">Update Staff Information</h2>
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Back Home
      </button>
      <br></br>
      <br></br>
      {!staff ? (
        <form onSubmit={handleRetrieve}>
          <h5 className="my-4 alert alert-info">
            Please enter the Employee Number and Unique Code to retrieve staff
            information for updating.
          </h5>
          <div className="form-group">
            <label>Employee Number</label>
            <input
              type="text"
              className="form-control"
              value={employeeNumber}
              onChange={(e) => setEmployeeNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Unique Code</label>
            <input
              type="text"
              className="form-control"
              value={uniqueCode}
              onChange={(e) => setUniqueCode(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Retrieve Staff
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* <br></br> */}
          <h5 className="my-4 alert alert-success">
            Staff information retrieved successfully. Please update the details
            below.
          </h5>
          <div className="form-group">
            <label>Employee Number</label>
            <input
              type="text"
              name="employee_number"
              className="form-control"
              value={formData.employee_number}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Unique Code</label>
            <input
              type="text"
              name="unique_code"
              className="form-control"
              value={formData.unique_code}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Surname</label>
            <input
              type="text"
              name="surname"
              className="form-control"
              value={formData.surname}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Other Names</label>
            <input
              type="text"
              name="other_names"
              className="form-control"
              value={formData.other_names}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              className="form-control"
              value={formData.date_of_birth}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>ID Photo (Base64)</label>
            <input
              type="text"
              name="id_photo"
              className="form-control"
              value={formData.id_photo}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Update Staff
          </button>
        </form>
      )}
    </div>
  );
}

export default UpdateStaff;
