const express = require('express');
const router = express.Router();
const jobSeekerController = require('../controllers/jobSeekerController');

// Define the route for user login
router.get('/jobSeekers', jobSeekerController.getAlljobSeekers);
router.post('/addJobSeeker', jobSeekerController.postjobSeeker);
router.get('/jobSeeker/:emailId', jobSeekerController.getJobSeeker);

module.exports = router;
