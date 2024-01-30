import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/forgotPassword.css"; // Add your CSS file for styling

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Implement the logic to send the email to your backend
    try {
      const response = await fetch("/request-password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Handle successful response
        alert("Please check your email for password reset instructions.");
        navigate("/login"); // Navigate back to the login page or a confirmation page
      } else {
        // Handle errors
        const error = await response.json();
        console.log("email not found! " + error);
        alert(`Email not found!!!`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while requesting a password reset.");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2>Reset Your Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
export default ForgotPassword;
