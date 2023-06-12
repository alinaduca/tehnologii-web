const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { connectToDatabase, getClient } = require('./dbManager');

const app = express();
const port = 3000;

// Middleware pentru a analiza corpul cererilor
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint pentru crearea unui cont
app.post('/create-account', async (req, res) => {
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
    const collection = database.collection('Authentication');

    // Inserați detaliile utilizatorului în baza de date
    await collection.insertOne({ email, password: hashedPassword, salt });

    res.status(200).json({ message: 'Contul a fost creat cu succes' });
  } catch (error) {
    console.error('Eroare la crearea contului:', error);
    res.status(500).json({ message: 'A apărut o eroare la crearea contului' });
  }
});

// Pornirea serverului și conectarea la baza de date
connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Serverul a pornit pe portul ${port}`);
    });
  })
  .catch((error) => {
    console.error('Eroare la pornirea serverului:', error);
  });
