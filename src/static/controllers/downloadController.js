const { getClient } = require("../database/dbManager");
const { getEmail } = require("./loginController");

async function handleDownload(req, res, inputString) {
    try {
        title = decodeURIComponent(inputString.replace(/%20/g, ' '));

        const email = getEmail(); // Înlocuiește cu metoda ta de a obține adresa de email a utilizatorului

        // Verifică dacă există deja o înregistrare cu același email și titlu
        const client = getClient();
        const db = client.db('sagdatabase');
        const downloadsCollection = db.collection('downloads');
        const existingDownload = await downloadsCollection.findOne({ email: email, title: title });

        if (existingDownload) {
            // Dacă există deja o înregistrare, returnează un răspuns corespunzător
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 409; // Conflict - codul de stare pentru conflict
            res.end(JSON.stringify({ message: 'Download already exists.' }));
        } else {
            // Nu există o înregistrare existentă, efectuează inserarea
            const downloadData = {
                email: email,
                title: title,
            };
            await downloadsCollection.insertOne(downloadData);
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end("ok");
        }
    } catch (error) {
        console.error('Error handling download:', error);
        res.status(500).send('Internal Server Error');
    }
}

const getHistory = async (req, res) => {
    const client = getClient();
    const email = getEmail();
    const db = client.db('sagdatabase');
    const collection = db.collection('downloads');
    const users = await collection.find().toArray();
    const infos = [];
    for(let user of users) {
        if(user.email === email) {
            infos.push({"title" : user.title});
        }
    }
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(infos));
};

module.exports = { handleDownload, getHistory };