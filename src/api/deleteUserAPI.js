const { getClient } = require("../static/database/dbManager");

async function handleDeleteUserRequest(req, res, email) {
    const client = getClient();
    const db = client.db('sagdatabase');
    const collection = db.collection('users');
    const query = { "email" : email };
    const result = await collection.deleteOne(query);
    // collection = db.collection('Authentication');
    // result = await collection.deleteOne(query);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end("ok");
}

module.exports = { handleDeleteUserRequest };