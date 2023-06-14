const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb+srv://authenticationDB:iAlwqAFcb3usmiMh@cluster0.kn9hbrl.mongodb.net/';

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conexiunea la baza de date a fost stabilită cu succes');
    return client.db('Authentication');
  } catch (error) {
    console.error('Eroare la conectarea la baza de date:', error);
    throw error;
  }
}

module.exports = { connectToDatabase };
