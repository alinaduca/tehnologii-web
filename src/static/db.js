const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb+srv://authenticationDB:iAlwqAFcb3usmiMh@cluster0.kn9hbrl.mongodb.net/';

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('sagdatabase');
    console.log('Conexiunea la baza de date a fost stabilită cu succes');
    return db;
  } catch (error) {
    console.error('Eroare la conectarea la baza de date:', error);
    throw error;
  }
}

async function getAuthentication() {
  const { client, database } = await connectToDatabase();
  console.log(database);
  console.log(client);
  return {
    client: client,
    database: database.db('Authentication') // Modificați această linie
  };
}

module.exports = { connectToDatabase, getAuthentication };
