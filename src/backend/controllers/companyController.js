const companyModel = require( "../model/companies");

const getAllCompanies = async (req, res) => {
    try {
        const companies = await companyModel.find();
        res.status(200).json(companies);
    } catch(error) {
        console.log("Something went wrong!" + error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

const postCompany = async (req, res) => {
    const company = new companyModel(req.body);
    try {
        await company.save();
        res.status(201).json(company);

    } catch(error) {
        console.log("Error posting data!" + error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

const getCompany = async (req, res) => {
    const search_str = req.params.title;
    console.log("search_str: " + req.params.title);
    try {
        const companies = await companyModel.find({ $or: [
            { name: { $regex: new RegExp(search_str, 'i') } },
            { jobId: { $regex: new RegExp(search_str, 'i') } },
            { role: { $regex: new RegExp(search_str, 'i') } },
          ], });
        if(companies) {
            console.log("companies Fetched successfully" + companies);
            res.status(200).send(companies);
        } else {
            console.log("No companies found!!!");
            alert("No Companies Found!!!");
        }
    } catch(error) {
        console.log("Something went wrong!" + error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

module.exports = { getAllCompanies, postCompany, getCompany };