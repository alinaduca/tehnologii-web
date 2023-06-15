const http = require('http');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
// const { connectToDatabase, getClient } = require('./database/dbManager');

function handleCreateAccountSubmit(event) {
  event.preventDefault(); // Previne comportamentul implicit de reîncărcare a paginii

  const form = document.getElementById('createAccountForm');
  const formData = new FormData(form);

  const username = formData.get('username');
  console.log(username); // Afișează valoarea introdusă în câmpul "username"

  const forgotEmail = formData.get('forgotEmail');
  console.log(forgotEmail); // Afișează valoarea introdusă în câmpul "username"

  const password = formData.get('password');
  console.log(password); // Afișează valoarea introdusă în câmpul "username"

  const confirmPassword = formData.get('confirmPassword');
  console.log(confirmPassword); // Afișează valoarea introdusă în câmpul "username"
}

// fetch('/create-account', {
//   method: 'POST',
//   body: formData
// })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data); // Înlocuiește cu logica ta de gestionare a răspunsului
//   })
//   .catch(error => {
//     console.error('Eroare la efectuarea cererii:', error);
//   });



// async function handleCreateAccountSubmit(req, res) {
//   try {
//     const { email, password } = req.body;

//     // Generarea saltului
//     const salt = await bcrypt.genSalt(10);

//     // Criptarea parolei utilizând saltul generat
//     const hashedPassword = await bcrypt.hash(password + salt, 10);

//     // Obținerea clientului MongoDB din DBManager
//     const client = getClient();

//     // Selectați baza de date
//     const database = client.db('Authentication');

//     // Selectați colecția utilizatori
//     const collection = database.collection('users');

//     // Inserați detaliile utilizatorului în baza de date
//     await collection.insertOne({ email, password: hashedPassword, salt });

//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json');
//     res.end(JSON.stringify({ message: 'Contul a fost creat cu succes' }));
//   } catch (error) {
//     console.error('Eroare la crearea contului:', error);
//     res.statusCode = 500;
//     res.setHeader('Content-Type', 'application/json');
//     res.end(JSON.stringify({ message: 'A apărut o eroare la crearea contului' }));
//   }
// }

module.exports = { handleCreateAccountSubmit };
 