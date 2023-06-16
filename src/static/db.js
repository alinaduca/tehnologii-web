const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb+srv://authenticationDB:iAlwqAFcb3usmiMh@cluster0.kn9hbrl.mongodb.net/';

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('sagdatabase');
    console.log('Conexiunea la baza de date a fost stabilită cu succes');
    const collection = db.collection('users');
    collection.find().toArray((err, users) => {
      if (err) {
        console.error('Failed to fetch users from MongoDB', err);
        return;
      }
      console.log(users);
    });
    return client.db('Authentication');
  } catch (error) {
    console.error('Eroare la conectarea la baza de date:', error);
    throw error;
  }
}
module.exports = { connectToDatabase };
