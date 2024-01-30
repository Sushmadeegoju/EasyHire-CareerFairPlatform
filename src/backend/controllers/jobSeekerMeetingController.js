const jobSeekerMeetingModel = require("../model/jobSeekerMeetings");
const mongoose = require('mongoose');

// Endpoint to create a job seeker meeting
const postJobSeekerMeeting = async (req, res) => {
    const meeting = new jobSeekerMeetingModel(req.body);
    try {
        await meeting.save();
        res.status(201).json(meeting);
    } catch (error) {
        console.error("Error creating job seeker meeting:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Endpoint to retrieve all job seeker meetings
const getJobSeekerMeetings = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ObjectId' });
      }
    try {
        const meetings = await jobSeekerMeetingModel.find({jobSeeker:id});
        res.status(200).json(meetings);
    } catch (error) {
        console.error("Error retrieving job seeker meetings:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteJobSeekerMeeting = async (req, res) => {
    const meetingId = req.params.meetingId;
    if (!mongoose.Types.ObjectId.isValid(meetingId)) {
        return res.status(400).json({ error: 'Invalid MeetingId' });
    }

    try {
        const deletedMeeting = await jobSeekerMeetingModel.deleteOne({_id: meetingId});
        if (!deletedMeeting) {
            return res.status(404).json({ error: 'Meeting not found' });
        }
        res.status(200).json(deletedMeeting);
    } catch (error) {
        console.error("Error deleting job seeker meeting:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getJobSeekerMeetings, postJobSeekerMeeting, deleteJobSeekerMeeting };
