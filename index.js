// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res){
  //check if req.params.date is null or empty --OK 7° and 8° test
  if(req.params.date === undefined) {
    let now = Date.now();
    res.send({"unix": now, "utc": now});
  }

  //check if req.params.date is a number
  if(!isNaN(req.params.date)){
    let realDate = new Date(parseInt(req.params.date)).toGMTString();
    res.json({unix: parseInt(req.params.date), utc: realDate });
  }
  else {
    //check if req.params.date is a valid date --OK 6° test
    let realDate = Date.parse(new Date(req.params.date.toString()));
    if(isNaN(realDate)){
      res.send({ error : "Invalid Date" });
    }
    else {
      var myDate = new Date(realDate).toGMTString();
      res.json({unix: realDate, utc: myDate });
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
