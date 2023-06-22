const { getClient } = require("../database/dbManager");
const { getEmail } = require("./loginController");


async function handleDownload(req, res, title) {
    try {
        const email = getEmail(); // Replace with your method to retrieve the user's email
    
        // Save the download data to the database
        const client = getClient();
        const db = client.db('sagdatabase');
        const downloadsCollection = db.collection('downloads');
        const downloadData = {
            email: email,
            title: title,
            timestamp: new Date()
        };
        await downloadsCollection.insertOne(downloadData);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end("ok");
    } catch (error) {
        console.error('Error handling download:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { handleDownload };

