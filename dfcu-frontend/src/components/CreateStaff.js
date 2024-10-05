import React, { useState } from "react";
import axios from "axios";

function CreateStaff() {
  const [formData, setFormData] = useState({
    unique_code: "",
    surname: "",
    other_names: "",
    date_of_birth: "",
    id_photo: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/staff/register/", formData)
      .then((response) => {
        alert("Staff Registered Successfully");
        console.log(response.data);
      })
      .catch((error) => {
        alert("Error Registering Staff");
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h2 className="my-4">Register New Staff</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Unique Code</label>
          <input
            type="text"
            name="unique_code"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Surname</label>
          <input
            type="text"
            name="surname"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Other Names</label>
          <input
            type="text"
            name="other_names"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>ID Photo (Base64)</label>
          <input
            type="text"
            name="id_photo"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Register Staff
        </button>
      </form>
    </div>
  );
}

export default CreateStaff;
