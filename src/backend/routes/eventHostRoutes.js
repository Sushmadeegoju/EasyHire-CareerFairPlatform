const express = require('express');
const router = express.Router();
const eventHostController = require('../controllers/eventHostController');

// Define the route for user login
router.get('/eventHostsData', eventHostController.getAllEventHosts);
router.post('/addEventHost', eventHostController.postEventHost);
router.get('/eventHost/:emailId', eventHostController.getEventHost);

module.exports = router;
