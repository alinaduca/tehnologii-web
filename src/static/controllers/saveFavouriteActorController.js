const fs = require('fs');
const path = require('path');
const { getClient, connectToDatabase } = require("../database/dbManager");
const cookie = require('cookie');
const jwt = require('jsonwebtoken');

async function handleSaveFavouriteActorRequest(req, res) {
    const currentURL = req.url;

    const urlComponents = currentURL.split('/');
    const lastComponent = urlComponents.pop();
    const actorID = parseInt(lastComponent, 10);

    console.log('ID-ul actorului:', actorID);

    // insert into db
    const client = getClient();
    const db = client.db('sagdatabase');
    const collection = db.collection('favouriteActors');

    // luare email din token-ul din cookie
    // Obține token-ul din cookie
    const token = getTokenFromCookie(req);
    let email;

    if (token) {
      // Verifică și decodează token-ul
      const secretKey = 'ak1j3bk^jb4986:BKG9h%jG#I7687jhg!';
      jwt.verify(token, secretKey, (err, decodedToken) => {
        if (err) {
          console.log('Eroare la decodarea token-ului:', err.message);
          return;
        }
    
        // Token-ul a fost decodat cu succes
        console.log('Informații din token:', decodedToken);
        email = decodedToken.email;

        console.log('email: ' + email);
      });
    }

    const favActor = {
        email: email,
        actorID: actorID
      };
    
    await collection.insertOne(favActor);

    const actorUrl = '/actors/' + actorID;
    res.writeHead(302, { 'Location': actorUrl });
    res.end();
  }

  function getTokenFromCookie(req) {
    const cookies = req.headers.cookie;
    if (cookies) {
      const parsedCookies = cookie.parse(cookies);
      const token = parsedCookies.token;
      return token;
    }
    return null;
  }
  
  module.exports = { handleSaveFavouriteActorRequest };