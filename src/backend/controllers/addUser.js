const { write } = require('../model/data.js');

const addUserData = async (req, res) => {
    try {
        const user = req.body;
        await write(user);
        console.log("Written User data successfully");
        res.sendStatus(201);
    } catch(error) {
        console.log("Something went wrong!" + error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

module.exports = addUserData;