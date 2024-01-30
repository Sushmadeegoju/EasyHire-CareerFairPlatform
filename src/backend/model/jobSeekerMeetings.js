const mongoose = require("mongoose");

const jobSeekerMeetingSchema = mongoose.Schema({
    jobSeeker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobSeeker', // Reference to the jobSeekerModel
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
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
    company: {
        type: String,
        required: true,
    }
});

const JobSeekerMeetingModel = mongoose.model('JobSeekerMeeting', jobSeekerMeetingSchema);

module.exports = JobSeekerMeetingModel;
