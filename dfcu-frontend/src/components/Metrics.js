import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

function Metrics() {
  const navigate = useNavigate();
  const [uniqueCode, setUniqueCode] = useState("");
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState("");

  const handleRetrieve = (e) => {
    e.preventDefault();
    const postData = {
      unique_code: uniqueCode,
    };

    axios
      .post("http://localhost:8000/api/api-metrics/", postData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setMetrics(response.data);
        setError("");
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.error || "Error Retrieving Metrics";
        setError(errorMessage);
        setMetrics(null);
      });
  };

  return (
    <div className="container">
      <h2 className="my-4">API Metrics</h2>
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Back Home
      </button>
      <br />
      <br />
      <form onSubmit={handleRetrieve}>
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
          Retrieve Metrics
        </button>
      </form>
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
      {metrics && (
        <div className="mt-4">
          <div className="row">
            <div className="col-md-4">
              <div className="card text-white bg-primary mb-3">
                <div className="card-header">Total Requests</div>
                <div className="card-body">
                  <h5 className="card-title">{metrics.total_requests}</h5>
                  <p className="card-text">
                    This is the total number of API requests made.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-success mb-3">
                <div className="card-header">Successful Requests</div>
                <div className="card-body">
                  <h5 className="card-title">{metrics.successful_requests}</h5>
                  <p className="card-text">
                    This is the number of successful API requests.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-danger mb-3">
                <div className="card-header">Failed Requests</div>
                <div className="card-body">
                  <h5 className="card-title">{metrics.failed_requests}</h5>
                  <p className="card-text">
                    This is the number of failed API requests.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Bar
              data={{
                labels: [
                  "Total Requests",
                  "Successful Requests",
                  "Failed Requests",
                ],
                datasets: [
                  {
                    label: "API Metrics",
                    data: [
                      metrics.total_requests,
                      metrics.successful_requests,
                      metrics.failed_requests,
                    ],
                    backgroundColor: ["#007bff", "#28a745", "#dc3545"],
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Metrics;
