const jobSeekerModel = require( "../model/jobSeekers");

const getAlljobSeekers = async (req, res) => {
    try {
        const jobSeekers = await jobSeekerModel.find();
        // console.log(jobSeekers);
        res.status(200).json(jobSeekers);
    } catch(error) {
        console.log("Something went wrong!" + error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

const postjobSeeker = async (req, res) => {
    const jobSeeker = new jobSeekerModel(req.body);
    try {
        await jobSeeker.save();
        res.status(201).json(jobSeeker);

    } catch(error) {
        console.log("Error posting data!" + error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

const getJobSeeker = async (req,res) => {
    const emailId = req.params.emailId;
    try {
        const user = await jobSeekerModel.findOne({email : emailId});
        // console.log(user.json());
        res.status(200).json(user);
    } catch(error) {
        console.log("JobSeeker Not found!" + error);
        res.status(500).json({ error: "Jobseeker not found!" });
    }
}

module.exports = { getAlljobSeekers, postjobSeeker, getJobSeeker };