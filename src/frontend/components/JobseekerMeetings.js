import React, { useState, useEffect } from 'react';
import '../css/Meetings.css';


const Meeting = ({ firstName, lastName, company, timeSlot, venue, email, boothNumber, onCancel }) => (
  <div className="meeting">
    <div className="meeting-info">
      <div className="meeting-title">{`Meeting with ${firstName} ${lastName}`} / <a href="#">{company} </a></div>
      <div className="meeting-details">
        {timeSlot} / <a href={`mailto:${email}`}>{email}</a> <br></br><br></br>
        {/* Join <a href={link} className="meeting-link" target="_blank" rel="noopener noreferrer">Zoom Meeting</a> &nbsp;&nbsp;
        Passcode: {passcode} */}
        {`Location: ${venue}`}<br /><br/>
        {`Booth No.: ${boothNumber}`}
        <button className="cancel-button" onClick={onCancel}>Cancel Meeting</button>
      </div>
    </div>
  </div>
);

const MeetingsList = ({id}) => {
  const [meetings, setMeetings] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/jobSeekerMeetings/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
        }
      });

      if(response.ok) {
        setMeetings(await response.json());
      } else {
        console.log("Meetings not found!!");
      }
   } catch(e) {
      console.log("Error: " + e);
   }
  }

  useEffect(() => {
    fetchData();
  },[]);
  

  const cancelMeeting = async (meetingId) => {
    // const newMeetings = meetings.filter((_, i) => i !== index);
    try {
      const response = await fetch(`http://localhost:4000/deleteJobSeekerMeeting/${meetingId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
        }
      });

      if(response.ok) {
        console.log("Deleted meeting: ", response.json());
        fetchData();
      } else {
        console.log("Meetings not found!!");
      }
   } catch(e) {
      console.log("Error: " + e);
   }
  };

  return (
    <div className="meetings">
      <h1>My Meetings</h1>
      <p>View and Edit your personal meetings. <a href="#">Learn More</a></p>
      <div className="meetings-list">
        {meetings.map((meeting, index) => (
          <Meeting key={index} {...meeting} onCancel={() => cancelMeeting(meeting._id)} />
        ))}
      </div>
    </div>
  );
};

export default MeetingsList;
