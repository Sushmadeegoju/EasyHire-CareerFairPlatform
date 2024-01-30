import React, { useState, useEffect} from 'react';
import '../css/SponsorDetails.css';
import axios from 'axios';


function SponsorDetails({sponsor, userEmail, userName, userId}) {
    const { name, role, jobId, description, requirements, prefered, boothNum } = sponsor;
    const requirementItems = requirements.split('.').filter(item => item.trim() !== '');
    const preferedItems = prefered.split('.').filter(item => item.trim() !== '');
    const [showMeetingInfo, setShowMeetingInfo] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [recruiterData1, setRecruiterData1] = useState(null);

    
    // Function to reset the showTimeslot state
  const resetShowTimeslot = () => {
    setShowMeetingInfo(false);
    setShowPopup(false);
  };

  // Call the reset function when navigating to a new job opening
  useEffect(() => {
    resetShowTimeslot();
  }, [jobId]); // Assuming jobId uniquely identifies a job opening


    useEffect(() => {
        setRecruiterData1('');
        const fetchData = async (setDataFunction) => {
          try {
            // Replace with your API endpoint for fetching recruiter data
            const response = await axios.get(`/recruiters/${name}`);
            if(response.status === 200) {
                setDataFunction(response.data);
            } else {
                console.log("Error occured!!!");
            }
          } catch (error) {
            console.error('Error fetching recruiter data:', error);
          }
        };
    
        if (showMeetingInfo) {
          fetchData(setRecruiterData1);
        //   fetchData(recruiter2, setRecruiterData2);
        }
      }, [showMeetingInfo]);

    const handleAppointmentClick = (timeSlot) => {
        setShowPopup(true);
        
        // Define emailData with the necessary information
        const emailData = {
            userEmail: userEmail, 
            meetingDetails: timeSlot,
            recruiterName: recruiterData1.firstName + " " + recruiterData1.lastName,
            companyName: name,
            boothNumber: boothNum,
            userName: userName,
            recruiterEmail: recruiterData1.email
        };
    
        // Axios POST request to send the email
        axios.post('http://localhost:4000/send-email', emailData)
            .then(response => {
                console.log('Email sent successfully:', response.data);
                // Handle success - maybe update the state to show a success message
            })
            .catch(error => {
                console.error('Error in sending email:', error);
                // Handle error - maybe update the state to show an error message
            });

        const meetingData = {
          timeSlot: timeSlot,
          firstName: recruiterData1.firstName,
          lastName: recruiterData1.lastName,
          venue: 'Squires CommonWealth Ballroom',
          email: recruiterData1.email,
          jobSeeker: userId,
          boothNumber: boothNum,
          company: name
        }
        
        axios.post('http://localhost:4000/addJobSeekerMeeting',meetingData)
          .then(response => {
            console.log('Added Data successfully!', response.data);
          })
          .catch(error => {
            console.log('Error Adding data: ', error);
          });

          const recruiterMeetingData = {
            timeSlot: timeSlot,
            userName: userName,
            venue: 'Squires CommonWealth Ballroom',
            email: userEmail,
            recruiter: recruiterData1._id,
            boothNumber: boothNum,
            school: 'Virginia Tech'
          }

        axios.post('http://localhost:4000/addRecruiterMeeting',recruiterMeetingData)
          .then(response => {
            console.log('Added Data successfully!', response.data);
          })
          .catch(error => {
            console.log('Error Adding data: ', error);
          });

        setTimeout(() => {
            setShowPopup(false);
        }, 2000); // Hide popup after 2 seconds
    };
    

    return (
        <div className="sponsorDetails">
            <h1>{role}</h1>
            <p><strong>About Us</strong><br></br><br></br>{description}</p>
            <strong>Key Requirements</strong>
            <ul>
                    {requirementItems.map((item, index) => (
                        <li key={index}>{item.trim()}</li>
                    ))}
            </ul>
            <strong>Prefered Qualifications</strong>
            <ul>
                    {preferedItems.map((item, index) => (
                        <li key={index}>{item.trim()}</li>
                    ))}
            </ul>

            <p><strong>Job Id:  </strong>{jobId}</p>
            

            <div className="meetingToggle" onClick={() => setShowMeetingInfo(!showMeetingInfo)}>
                <span className="clockIcon">🕐</span>
                <span>Ready to meet with a recruiter?</span>
                <span className="dropdownArrow">{showMeetingInfo ? '▲' : '▼'}</span>
            </div>
            {showMeetingInfo && recruiterData1 && (
                <div className="meetingInfo">
                {recruiterData1.timeSlots.map((timeSlot, index) => (
                  <div key={index} className="timeSlotInfo" style={{ display: "flex" }}>
                    <div className="leftInfo">
                      <div className="dateInfo">
                        <h3>Schedule Time</h3>
                        <h4>{timeSlot}</h4>
                      </div>
                      {/* Additional information or components can be added here */}
                    </div>
                    <div className="rightInfo">
                      <div className="recruiterInfo">
                        <h3>Assigned Recruiter</h3>
                        <h4>{recruiterData1.firstName + " " + recruiterData1.lastName}</h4>
                      </div>
                      <div className="availableSlots"> 
                        <button onClick={() => handleAppointmentClick(timeSlot)}>Make an Appointment</button>
                        {showPopup && (
                          <span className="popup">
                            ✔ Your meeting is scheduled.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
        
    );
}

export default SponsorDetails;
