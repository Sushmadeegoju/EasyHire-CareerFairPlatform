import React, { useState } from "react";
import "../css/register.css";
import CandidateForm from "./Candidateform";
import RecruiterForm from "./Recruiterform";

function CareerFairPlus() {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div style={{ fontWeight: "bold" }}>Join Us!</div>
        <div className="selection">
          <div className="role" onClick={() => handleRoleSelect("Recruiter")}>
            <span>Recruiter</span>
          </div>
          <div className="role" onClick={() => handleRoleSelect("Candidate")}>
            <span>Candidate</span>
          </div>
        </div>
        {selectedRole === "Recruiter" && (
          <div>
            <h3>Recruiter Form</h3>
            <RecruiterForm />
          </div>
        )}
        {selectedRole === "Candidate" && (
          <div>
            <h3>Candidate Form</h3>
            <CandidateForm />
          </div>
        )}
      </div>
    </div>
  );
}

export default CareerFairPlus;
