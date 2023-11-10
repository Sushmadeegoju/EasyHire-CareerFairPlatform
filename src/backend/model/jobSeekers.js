const mongoose = require( "mongoose" );
// const validator = require(" validator ");

const jobSeekerSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    }, 
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        // validator(value) {
        //     if (!validator.isEmail(value)) {
        //         console.log("Value of email is incorrect" + value);
        //         alert('Email provided is incorrect!' + value);
        //     }
        // }
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    }, 
    experience: {
        type: String,
        required: true
    },
    linkedIn: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: true
    }
})

const jobSeekerModel = mongoose.model('jobSeekers', jobSeekerSchema)
module.exports = jobSeekerModel;