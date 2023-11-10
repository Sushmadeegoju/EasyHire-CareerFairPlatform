const fs = require('fs');

function read() {
    try{
        const users = JSON.parse(fs.readFileSync('src/backend/model/users.json', 'utf-8')).users;
        return users;
    }
    catch(error) {
        console.log('Error reading the file', error);
        return { error: 'Error reading the file' };
    }
}

function write(data) {
    try{
        const modifiedUsers = JSON.parse(fs.readFileSync('src/backend/model/users.json', 'utf-8')).users;
        // console(data, data);
        modifiedUsers.push(data);
        const userData = { users : modifiedUsers};
        console.log(userData);
        fs.writeFileSync('src/backend/model/users.json', JSON.stringify(userData, null, 2), 'utf-8');
    }
    catch(error) {
        console.log('Error writing to the file', error);
    }
}

function readCompanies() {
    try{
        const companies = JSON.parse(fs.readFileSync('src/backend/model/companies.json', 'utf-8')).companies;
        return companies;
    }
    catch(error) {
        console.log('Error reading the file', error);
        return { error: 'Error reading the file' };
    }
}

module.exports = { read, write, readCompanies };