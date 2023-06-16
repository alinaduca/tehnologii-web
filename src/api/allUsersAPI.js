const { getClient } = require("../static/database/dbManager");

const getData = (req, res) => {
    const client = getClient();
    const db = client.db('sagdatabase');
    // console.log(db);
    const collection = db.collection('users');
    let users = [];
    console.log(collection.find().toArray());
    // collection.find().toArray((err, users) => {
    //     console.log("hereee");
    //   if (err) {
    //     console.error('Failed to fetch users from MongoDB', err);
    //     return;
    //   }
    //   console.log(users);
    // });

    // collection.find().toArray();
    //     .sort({ username : 1})
    //     .forEach(user => users.push(user)).then(() => {
    //     // res.status(200).json(users);
    //     res.statusCode = 200;
    //     res.end(JSON.stringify(data));
    // }).catch(() => {
    //     // res.status(500).json({error: 'Could not fetch the documents.'})
    // })

    console.log(users);

    // collection.find({}, { projection: { _id: 0, name: 1 } }).toArray((err, users) => {
    //     if (err) {
    //       console.error('Failed to fetch users from MongoDB', err);
    //       res.statusCode = 500;
    //       res.end('Internal Server Error');
    //       return;
    //     }
        
    //     const names = users.map(user => user.username);
    //     console.log(names);
    //     // const data = {
    //     //   names: names,
    //     // };
    // });
    

    // const data = {
    //     message: 'Hello, world!',
    //     timestamp: new Date().toISOString(),
    // };
    // res.setHeader('Content-Type', 'application/json');
    // res.statusCode = 200;
    // res.end(JSON.stringify(data));
};

module.exports = getData;