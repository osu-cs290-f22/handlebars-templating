var express = require('express');
var exphbs = require('express-handlebars')

var peopleData = require("./peopleData.json")
console.log("== peopleData:", peopleData)

var port = process.env.PORT || 8000;
var app = express();

app.engine('handlebars', exphbs.engine({
  defaultLayout: "main"
}))
app.set('view engine', 'handlebars')

app.use(express.static('public'));

app.get('/people', function (req, res, next) {
  res.status(200).sendFile(__dirname + '/public/people.html');
});


app.get('/people/:person', function (req, res, next) {
  var person = req.params.person.toLowerCase();
  var personData = peopleData[person]
  console.log("== data for", person, ":", personData)

  if (personData) {
    res.status(200).render('photoPage', {
      name: personData.name,
      photos: personData.photos,
      // truthyOrFalsy: null
    })
  } else {
    next();
  }
});

app.get("*", function (req, res, next) {
  res.status(404).render('404')
});

app.listen(port, function (err) {
  if (err) {
    throw err;
  }
  console.log("== Server listening on port", port);
});
