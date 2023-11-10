const recruiterModel = require( "../model/recruiters");

const getAllRecruiters = async (req, res) => {
    try {
        const recruiters = await recruiterModel.find();
        res.status(200).json(recruiters);
    } catch(error) {
        console.log("Something went wrong!" + error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

const postRecruiter = async (req, res) => {
    const recruiter = new recruiterModel(req.body);
    try {
        await recruiter.save();
        res.status(201).json(recruiter);

    } catch(error) {
        console.log("Error posting data!" + error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

module.exports = { getAllRecruiters, postRecruiter };