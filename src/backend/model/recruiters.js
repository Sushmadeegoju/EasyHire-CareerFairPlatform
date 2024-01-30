const mongoose = require( "mongoose" );

const recruiterSchema = mongoose.Schema({
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
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    timeSlots: [String]
})

const recruiterModel = mongoose.model('recruiters', recruiterSchema)
module.exports = recruiterModel;