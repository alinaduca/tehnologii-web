const http = require('http');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
// const { connectToDatabase, getClient } = require('./database/dbManager');

function handleCreateAccountRequest(req, res) {
  const filePath = path.join(__dirname, '../pages/createAccount.html');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end('404 Not Found');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    }
  });
}

async function handleCreateAccountSubmit(req, res) {
  try {
    const { email, password } = req.body;

    // Generarea saltului
    const salt = await bcrypt.genSalt(10);

    // Criptarea parolei utilizând saltul generat
    const hashedPassword = await bcrypt.hash(password + salt, 10);

    // Obținerea clientului MongoDB din DBManager
    const client = getClient();

    // Selectați baza de date
    const database = client.db('Authentication');

    // Selectați colecția utilizatori
    const collection = database.collection('users');

    // Inserați detaliile utilizatorului în baza de date
    await collection.insertOne({ email, password: hashedPassword, salt });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Contul a fost creat cu succes' }));
  } catch (error) {
    console.error('Eroare la crearea contului:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'A apărut o eroare la crearea contului' }));
  }
}

module.exports = { handleCreateAccountRequest, handleCreateAccountSubmit };
 