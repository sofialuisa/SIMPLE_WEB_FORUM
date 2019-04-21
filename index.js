var express = require('express');
var app = express();
var bodyParser = require("body-parser");
const url = require('url');
const path = require('path');
const PORT = process.env.PORT || 8000

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));

// var insults_dict = {
//   0: "bad, stupid and amateur",
//   1: "awful, predictible and arrogant",
//   2: "boring, careless and aggresive",
//   3: "fussy, ugly and noisey",
//   4: "plain, unoriginal and overrated"
// };


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
