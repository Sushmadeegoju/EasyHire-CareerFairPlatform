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

const getRecruiter = async (req, res) => {
    const search_str = req.params.companyName;
    console.log("search_str: " + req.params.companyName);
    try {
        const recruiter = await recruiterModel.findOne({ companyName : { $regex: new RegExp(search_str, 'i') } });
        if(recruiter) {
            console.log("recruiter: " + recruiter);
            res.status(200).send(recruiter);
        } else {
            console.log("No recruiter found!!!");
            alert("No recruiter Found!!!");
        }
    } catch(error) {
        console.log("Something went wrong!" + error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

const getRecruiterById = async (req,res) => {
    const id = req.params.id;
    try {
        const user = await recruiterModel.findOne({_id : id});
        console.log("User: ", user);
        res.status(200).json(user);
    } catch(error) {
        console.log("Recruiter Not found!" + error);
        res.status(500).json({ error: "Recruiter not found!" });
    }
}

module.exports = { getAllRecruiters, postRecruiter, getRecruiter, getRecruiterById };