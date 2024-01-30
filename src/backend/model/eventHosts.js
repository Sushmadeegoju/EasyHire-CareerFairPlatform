const mongoose = require( "mongoose" );

const eventHostSchema = mongoose.Schema({
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
    }
})

const eventHostModel = mongoose.model('eventHost', eventHostSchema)
module.exports = eventHostModel;