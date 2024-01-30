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
    phone: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    skillset: {
        type: String,
        required: true
    }, 
    workExperience: {
        type: String,
        required: true
    },
    linkedIn: {
        type: String
    },
    image: {
        type: String,
    },
    resume: {
        type: String
    }
})

const jobSeekerModel = mongoose.model('jobSeekers', jobSeekerSchema)
module.exports = jobSeekerModel;