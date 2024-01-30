const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruiterController'); 
const recruiterMeetingController = require('../controllers/recruiterMeetingController')

// Define the route for user login
router.get('/recruiters', recruiterController.getAllRecruiters);
router.post('/addRecruiter', recruiterController.postRecruiter);
router.get('/recruiters/:companyName', recruiterController.getRecruiter);
router.post('/addRecruiterMeeting', recruiterMeetingController.postRecruiterMeeting);
router.get('/recruiterMeetings/:id', recruiterMeetingController.getRecruiterMeetings);
router.get('/recruiter/:id', recruiterController.getRecruiterById);
router.get('/deleteRecruiterMeeting/:meetingId', recruiterMeetingController.deleteRecruiterMeeting);

module.exports = router;