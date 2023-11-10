const { read } = require('../model/data.js');

const getAllJobSeekersData = async (req, res) => {
    try {
        const users = await read();
        console.log(users);
        const jobSeekers = await users.filter(user => user.designation == 'Job Seeker');
        if(jobSeekers.length){
            res.status(200).json(jobSeekers); // Sending the user back as a response
        } else {
            console.log("error: There are no Job Seeker");
            res.status(404).json({ error: "Job Seekers not found!" });
        }
    } catch(error) {
        console.log("Something went wrong!" + error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}


module.exports = getAllJobSeekersData;