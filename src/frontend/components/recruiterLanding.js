import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../css/recruiterLanding.css";

const DisplayJobSeekers = ({name, id}) => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [recruiter, setRecruiter] = useState({});
  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

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
      const response = await fetch("/jobSeekersData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("userData: " + userData);
        setUsers(userData); // Update the state with the fetched data
      } else {
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const handleAppointmentClick = async (user) => {
    setShowPopup(true);

    // console.log("recruiter email: ",email);
    try {
      const response = await fetch(`http://localhost:4000/recruiter/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // const recruiterData = await response.json();'
      if(response.ok) {
        const recruiterData = await response.json();
        setRecruiter(recruiterData);
        console.log("Recruiter: ", recruiter);
      }
      else {
        console.log("Recruiter details not fetched!");
      }
    } catch (error) {
      console.log("Error fetching Recruiter Data: ", error);
    }
    // Define emailData with the necessary information
    const emailData = {
      timeSlots: recruiter.timeSlots,
      jobSeekerName: user.firstName,
      jobSeekerEmail: user.email,
      recruiterName: name,
      companyName: recruiter.companyName,
    };

    // Axios POST request to send the email
    axios.post('http://localhost:4000/send-invite', emailData)
        .then(response => {
            console.log('Email sent successfully:', response.data);
            // Handle success - maybe update the state to show a success message
        })
        .catch(error => {
            console.error('Error in sending email:', error);
            // Handle error - maybe update the state to show an error message
        });

    setTimeout(() => {
        setShowPopup(false);
    }, 2000); // Hide popup after 2 seconds
};

  return (
    <div class="recruiter-landing">
      <div className="recruiter-container">
        <h1>Candidate Details</h1>
        {users.length > 0 && (
          <div className="user-card">
            <img
              src={`${process.env.PUBLIC_URL}/images/${users[currentIndex].firstName}.png`}
              alt={`${users[currentIndex].firstName}'s avatar`}
              style={{maxWidth: "300px" || '100%',
              maxHeight: "200px" || '100%',
              width: 'auto',
              height: 'auto',}}
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
                  href={users[currentIndex].linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {users[currentIndex].linkedIn}
                </a>{" "}
              </p>
            </div>

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

            <button onClick={() => handleAppointmentClick(users[currentIndex])}>Make an Appointment</button>
                        {showPopup && (
                          <span className="popup">
                            ✔ Your meeting is scheduled.
                          </span>
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
