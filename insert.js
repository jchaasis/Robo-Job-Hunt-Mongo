let mongo = require('mongodb').MongoClient;
let data = require('./data');

//connect to the database
mongo.connect('mongodb://localhost:27017/test', function (err, db) {
    const users = db.collection('users');

//loop through the robot js data and push it to the database
  for (let i = 0; i < data.users.length; i++) {

    if (data.users[i].company === null){
      (data.users[i].company = "Available for Hire");
    }

    users.insert(data.users[i]);

  }
  db.close();
});
