const eventHostModel = require( "../model/eventHosts");

const getAllEventHosts = async (req, res) => {
    try {
        const eventHosts = await eventHostModel.find();
        // console.log(eventHosts);
        res.status(200).json(eventHosts);
    } catch(error) {
        console.log("Something went wrong!" + error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

const postEventHost = async (req, res) => {
    const eventHost = new eventHostModel(req.body);
    try {
        await eventHost.save();
        res.status(201).json(eventHost);

    } catch(error) {
        console.log("Error posting data!" + error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

const getEventHost = async (req,res) => {
    const emailId = req.params.emailId;
    try {
        const user = await eventHostModel.findOne({email : emailId});
        // console.log(user.json());
        res.status(200).json(user);
    } catch(error) {
        console.log("eventHost Not found!" + error);
        res.status(500).json({ error: "eventHost not found!" });
    }
}

module.exports = { getAllEventHosts, postEventHost, getEventHost };