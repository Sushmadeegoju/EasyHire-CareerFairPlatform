const express = require('express');
const router = express.Router();
const jobSeekerController = require('../controllers/jobSeekerController');
const jobSeekerMeetingController = require('../controllers/jobSeekerMeetingController')

// Define the route for user login
router.get('/jobSeekersData', jobSeekerController.getAlljobSeekers);
router.post('/addJobSeeker', jobSeekerController.postjobSeeker);
router.get('/jobSeeker/:emailId', jobSeekerController.getJobSeeker);
router.post('/addJobSeekerMeeting', jobSeekerMeetingController.postJobSeekerMeeting);
router.get('/jobSeekerMeetings/:id', jobSeekerMeetingController.getJobSeekerMeetings);
router.get('/deleteJobSeekerMeeting/:meetingId', jobSeekerMeetingController.deleteJobSeekerMeeting);

module.exports = router;
