import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import CreateStaff from "./components/CreateStaff";
import RetrieveSingleStaff from "./components/RetrieveSingleStaff";
import RetrieveAllStaff from "./components/RetrieveAllStaff";
import UpdateStaff from "./components/UpdateStaff";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create" element={<CreateStaff />} />
          <Route path="/retrieve/single" element={<RetrieveSingleStaff />} />
          <Route path="/retrieve/all" element={<RetrieveAllStaff />} />
          <Route path="/update" element={<UpdateStaff />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
