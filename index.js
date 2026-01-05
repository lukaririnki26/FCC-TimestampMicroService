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


// API endpoint for timestamp conversion
app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;
  let dateObj;
  
  // If no date parameter provided, use current time
  if (!dateString) {
    dateObj = new Date();
  } else {
    // Try to parse the date string
    // Check if it's a valid Unix timestamp (all digits)
    if (/^\d+$/.test(dateString)) {
      dateObj = new Date(parseInt(dateString));
    } else {
      dateObj = new Date(dateString);
    }
  }
  
  // Check if the date is valid
  if (dateObj.toString() === 'Invalid Date') {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: dateObj.getTime(),
      utc: dateObj.toUTCString()
    });
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
