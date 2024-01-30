// recruiterMeetingModel.js
const mongoose = require("mongoose");

const recruiterMeetingSchema = mongoose.Schema({
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter', // Reference to the jobSeekerModel
        required: true,
    },
    userName: {
        type: String,
        required: true,},
    email: {
        type: String,
        required: true,
    },
    timeSlot: {
        type: String, // Assuming you want to store the meeting time as a date
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    boothNumber: {
        type: String,
        required: true,
    },
    school: {
        type: String,
    }
});

const RecruiterMeetingModel = mongoose.model('RecruiterMeeting', recruiterMeetingSchema);

module.exports = RecruiterMeetingModel;
