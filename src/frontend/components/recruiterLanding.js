import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/recruiterLanding.css";

const DisplayJobSeekers = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleNext = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/api/jobSeekers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUsers(userData); // Update the state with the fetched data
      } else {
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div class="recruiter-landing">
      <div class="lgot-btn">
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="recruiter-container">
        <h1>Candidate Details</h1>
        {users.length > 0 && (
          <div className="user-card">
            <img
              src={users[currentIndex].image}
              alt={`${users[currentIndex].firstName}'s avatar`}
              className="user-image"
            />
            <div class="user-details">
              <p>Name: {users[currentIndex].firstName}</p>
              <p>Email: {users[currentIndex].email}</p>
              <p>Phone: {users[currentIndex].phone}</p>
              <p>Degree: {users[currentIndex].degree}</p>
              <p>Experience: {users[currentIndex].workExperience}</p>
              <p>
                Linkedin Profile URL:
                <a
                  href={users[currentIndex].linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {users[currentIndex].linkedin}
                </a>{" "}
              </p>
            </div>
            {/* {users[currentIndex].resume && (
              <>
                <div class="btns-div">
                  <button onClick={() => setShowModal(true)}>
                    View Resume
                  </button>
                  <button onClick={() => setShowModal(false)}>Close</button>
                </div>
                {showModal && (
                  <div className="modal">
                    <iframe
                      src={users[currentIndex].resume}
                      width="100%"
                      height="500px"
                      title="Resume Preview"
                    />
                  </div>
                )}
              </>
            )} */}

            {users[currentIndex].resume && (
              <>
                <div className="btns-div">
                  {!showModal && (
                    <button onClick={() => setShowModal(true)}>
                      View Resume
                    </button>
                  )}
                  {showModal && (
                    <>
                      <button onClick={() => setShowModal(false)}>Close</button>
                      <div className="modal">
                        <iframe
                          src={users[currentIndex].resume}
                          width="100%"
                          height="500px"
                          title="Resume Preview"
                        />
                      </div>
                    </>
                  )}
                </div>
              </>
            )}

            <div className="card-navigation">
              <button onClick={handlePrev} disabled={currentIndex === 0}>
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === users.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayJobSeekers;
