const express = require('express');
const mustache = require('mustache-express');
const bodyparser = require('body-parser');
let mongo = require('mongodb').MongoClient;

//initialize server
const server = express();

server.use(express.static('public'));

//configure the server
    //mustache
    server.engine('mustache', mustache());
    server.set('views', './views');
    server.set('view engine', 'mustache');

    //bodyparser
    server.use(bodyparser.urlencoded({ extended: false }));

//mongo db
mongo.connect('mongodb://localhost:27017/test', function (err, db){
    const users = db.collection('users');

        // List all of the users
        server.get('/index', function (req, res) {
            // Get data from mongo
            // list it using mustache
            users.find().toArray().then(function (users) {
                res.render('index', {
                    users: users,
                });
            });
        });

        //get employed robots
        server.get('/employed', function(req, res){

          users.find(({job: {$nin: [null]}})).toArray().then(function (users) {
              res.render('employed', {
                  users: users,
              });
          });
      });

      //get unemployed robots
      server.get('/unemployed', function(req, res){

        users.find({job: null}).toArray().then(function (users) {
            res.render('unemployed', {
                users: users,
            });
        //if employed, working is true. if unemployed, working is false

      });
    });
});



server.listen(3000, function () {
  console.log('Successfully started express server!');
});
