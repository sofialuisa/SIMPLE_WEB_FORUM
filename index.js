var express = require('express');
var app = express();
var bodyParser = require("body-parser");
const url = require('url');
const path = require('path');
var mustacheExpress = require('mustache-express');
//var request = require('request');
const PORT = process.env.PORT || 8000;
var { Client } = require('pg');
var client;
if (process.env.DATABASE_URL){
  client = new Client({connectionString: process.env.DATABASE_URL, ssl: true});
} else {
  client = new Client({database: 'postgresql-animate-14053'});
}
client.connect();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname);

app.get('/', function(req, res1){
      client.query('SELECT * FROM posts', (err, res2) => {
        if (err) throw err;
        for (let row of res2.rows) {
          console.log(JSON.stringify(row));
        }
        let messagesArray = res2.rows;
        res1.render('index', {
          messagesArray
        });
        // client.end();
      });

});

app.post('/post',function (req, res3){
  var myText = req.body.mytext;
    if (myText === undefined){
      res3.sendFile(path.join(__dirname + '/index.html'))
    }else{
      client.query('INSERT INTO posts (message) VALUES (\'' + myText + '\')', function (error, results) {
      if (error) throw error;
      res3.redirect('/');
    });
    }
})

app.listen(PORT, function() {

});
