import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import logo from "../assets/dfcu_logo.jpg";

function LandingPage() {
  return (
    <div className="landing-page">
      <header className="bg-primary text-white text-center py-5">
        <h1>Welcome to DFCU BANK Staff Registration Portal</h1>
        <p className="lead">
          Register, Update, and Manage Your Staff Information with Ease
        </p>
      </header>

      <div className="container my-5">
        <div className="logo-container">
          <img src={logo} alt="DFCU Bank Logo" className="logo_home" />
        </div>
      </div>
      <br></br>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">Register New Staff</h5>
                <p className="card-text">
                  Click here to register a new staff member.
                </p>
                <Link to="/create" className="btn btn-primary">
                  Register Staff
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">Retrieve Single Staff</h5>
                <p className="card-text">
                  Retrieve information for a specific staff member.
                </p>
                <Link to="/retrieve/single" className="btn btn-primary">
                  Retrieve Staff
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">Retrieve All Staff</h5>
                <p className="card-text">
                  Get a list of all registered staff members.
                </p>
                <Link to="/retrieve/all" className="btn btn-primary">
                  View All Staff
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">Update Staff Information</h5>
                <p className="card-text">
                  Update details of existing staff members.
                </p>
                <Link to="/update" className="btn btn-primary">
                  Update Staff
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">View API Performance</h5>
                <p className="card-text">
                  Number of requests, successful and failed requests.
                </p>
                <Link to="/metrics" className="btn btn-primary">
                  View API Metrics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-dark text-white text-center py-3">
        <p>&copy; 2024 DFCU BANK | Empowering Staff Management</p>
      </footer>
    </div>
  );
}

export default LandingPage;
