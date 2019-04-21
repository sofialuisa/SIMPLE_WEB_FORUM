var express = require('express');
var app = express();
var bodyParser = require("body-parser");
const url = require('url');
const path = require('path');
const PORT = process.env.PORT || 8000;
var { Client } = require('pg');
var client = new Client({database: 'simple_web_forum'});
client.connect();


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));

client.query('SELECT simple_web_forum;', (err, res) => {
  if (err) throw err;
  for (let column of res.column) {
    console.log(JSON.stringify(column));
  }
  client.end();
});

app.get('/', function(req, res){
    var myText = req.query.mytext; //mytext is the name of your input box
    if (myText === undefined){
      res.sendFile(path.join(__dirname + '/index.html'))
    }else{
      // res.send('the band ' + myText + ' is so ' + insults_dict[Math.floor(Math.random(insults_dict)*4)]);
      res.send(myText);
    }
});

app.listen(PORT, function() {

});
