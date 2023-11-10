const { read } = require('../../model/data.js');

const getJobSeekerData = async (jobSeekerId) => {
    try {
        const users = await read();
        // console.log(users);
        const user = users.filter(user => user.id == jobSeekerId);
        // console.log(user);
        return user;
    } catch(error) {
        throw new Error("Something went wrong: " + error);
    }
}

module.exports = getJobSeekerData;


