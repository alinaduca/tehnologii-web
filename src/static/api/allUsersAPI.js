const { getClient } = require("../database/dbManager");

const getData = async (req, res) => {
    const client = getClient();
    const db = client.db('sagdatabase');
    const collection = db.collection('users');
    const users = await collection.find().toArray();
    const infos = [];
    for(let user of users) {
        infos.push({"username" : user.username, "email" : user.email, "type" : user.type});
    }
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(infos));
};

module.exports = getData;