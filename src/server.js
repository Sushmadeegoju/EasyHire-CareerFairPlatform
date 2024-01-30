const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
require("./backend/db/mongoose");
const cors = require('cors');
const loginRoute = require('./backend/routes/loginRoutes');
const jobSeekersRoute = require('./backend/routes/jobSeekerRoutes');
const companyRoute = require("./backend/routes/companiesRoutes");
const recruiterRoute = require( "./backend/routes/recruiterRoutes" );
const eventHostRoute = require("./backend/routes/eventHostRoutes");
const port = 4000; // Define the port number for your server


app.use(express.json());
app.use(cors());

// Define your API routes
app.use(loginRoute); 
app.use(jobSeekersRoute);
app.use(companyRoute);
app.use(recruiterRoute);
app.use(eventHostRoute);


// Handle any other API routes
app.get('/api', (req, res) => {
    // Handle your API routes here
    res.send('API is working');
});

//------------ email service code ------
// Email transport configuration
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kirandot1976@gmail.com',
        pass: 'pomspuhscwqunbzt'
    }
});

// POST endpoint for sending emails
app.post('/send-email', (req, res) => {
    const { userEmail, meetingDetails, recruiterName, recruiterEmail, companyName, boothNumber, userName } = req.body;
    
    const mailJobSeeker = {
        from: 'kirandot1976@gmail.com',
        to: userEmail,
        subject: 'EasyHire Meeting Confirmation',
        text: `Dear ${userName},\n\nYour meeting is scheduled on ${meetingDetails} with ${recruiterName} from ${companyName}.\n\nVenue: Squires CommonWealth Ballroom\nBoothNumber: ${boothNumber}\n\nLooking forward to meet you!\n\nRegards,\n${recruiterName}`
    };

    transporter.sendMail(mailJobSeeker, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error in sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });

    const mailRecruiter = {
        from: 'kirandot1976@gmail.com',
        to: recruiterEmail,
        subject: 'EasyHire Meeting Confirmation',
        text: `Dear ${recruiterName},\n\nYour meeting is scheduled on ${meetingDetails} with ${userName}.\n\nVenue: Squires CommonWealth Ballroom\nBoothNumber: ${boothNumber}\n\nLooking forward to meet you!\n\nRegards,\n${userName}`
    };

    transporter.sendMail(mailRecruiter, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error in sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

app.post('/send-invite', (req, res) => {
    const { timeSlots, jobSeekerName, jobSeekerEmail, recruiterName, companyName } = req.body;

    const mailJobSeeker = {
        from: 'kirandot1976@gmail.com',
        to: jobSeekerEmail,
        subject: 'EasyHire Meeting Invite',
        text: `Dear ${jobSeekerName},\n\nCongratulations on clearing the resume screening round with ${companyName}! We would like to proceed with the technical interview. \n\nPlease select one slot from the below timeslots: \n\n${timeSlots}.\nVenue: Squires CommonWealth Ballroom\n\nLooking forward to meet you!\n\nRegards,\n${recruiterName}`
    };

    transporter.sendMail(mailJobSeeker, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error in sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});


app.post('/request-password-reset', async (req, res) => {
    const { email } = req.body;
    const response = await fetch(`http://localhost:4000/jobSeeker/${email}`);
    const userData = await response.json();

    if (!response.ok) {
      // If the response status is not OK, the email is not found
      res.status(404).send('Email not found!');
      return;
    }

    const { firstName, password } = userData;

    const mailOptions = {
        from: 'kirandot1976@gmail.com',
        to: email,
        subject: 'Forgot Password Request',
        text: `Dear ${firstName},\n\nYour password is ${password}.\n\nRegards,\nEasyHire, Inc`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error in sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
