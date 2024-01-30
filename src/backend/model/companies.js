const mongoose = require( "mongoose" );

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    role: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: String,
        required: true
    },
    prefered: {
        type: String,
        required: true
    },
    jobId: {
        type: String,
        required: true
    }, 
    boothNum: {
        type: String,
    }
})

const companyModel = mongoose.model('companies', companySchema)
module.exports = companyModel;