const { readCompanies } = require('../model/data.js');

const getAllCompaniesData = async (req, res) => {
    try {
        const companies = await readCompanies();
        if(companies.length){
            res.status(200).json(companies); // Sending the user back as a response
        } else {
            console.log("error: There are no Companies Listed!");
            res.status(404).json({ error: "Companies not listed!" });
        }
    } catch(error) {
        console.log("Something went wrong!" + error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

module.exports = getAllCompaniesData;