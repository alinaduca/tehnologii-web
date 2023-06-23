const MongoClient = require('mongodb').MongoClient;

// Definirea URL-ului de conexiune la MongoDB Atlas
const uri = 'mongodb+srv://authenticationDB:iAlwqAFcb3usmiMh@cluster0.kn9hbrl.mongodb.net/';
let client;

async function connectToDatabase() {
  try {
    client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conexiunea la baza de date a fost stabilită cu succes');
  } catch (error) {
    console.error('Eroare la conectarea la baza de date:', error);
    throw error;
  }
}

function getClient() {
  return client;
}

module.exports = { connectToDatabase, getClient };
