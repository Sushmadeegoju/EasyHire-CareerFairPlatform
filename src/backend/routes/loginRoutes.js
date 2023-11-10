const express = require('express');
const router = express.Router();
const validateUser = require('../controllers/validateUser');

// Define the route for user login
router.post('/validate', validateUser);

module.exports = router;
