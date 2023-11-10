const { read } = require('../model/data.js');

const validateUser = async (req, res) => {
    console.log("entered");
    try {
        const { email, password } = req.body;
        console.log("login entered: " + email); 
        const users = await read();
        console.log("check user reception: " + email + " " + password);
        const user = users.filter(user => user.email == email && user.password == password);
        console.log(user);
        if(user.length){
            res.json(user); // Sending the user back as a response
        } else {
            // alert(new Error("User Not Found"));
            console.log("error: User Not Found");
            res.status(404).json({ error: "User Not Found" });
        }
    } catch(error) {
        // alert(new Error("Something went wrong!"));
        console.log("Something went wrong!" + error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

module.exports = validateUser;