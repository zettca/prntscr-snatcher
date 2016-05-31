var express = require('express');
var cheerio = require('cheerio');
var cloudscraper = require('cloudscraper');

var app = express();

app.use(express.static(__dirname + '/client'));

app.get("/imgCode/:id", function(req, res){
  cloudscraper.get("http://prnt.sc/" + req.params.id, function(error, body, response){
    if (!error){
      res.setHeader('Content-Type', 'application/json');
      res.send(getURLfromHTML(body));
    }
  });
});

function getURLfromHTML(body){
  var parser = cheerio.load(body);
  return parser("#screenshot-image").attr("src");
}

app.listen(process.env.PORT || 3000);
