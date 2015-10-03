var http = require('http');

var express = require('express');
var cheerio = require('cheerio');
var cloudscraper = require('cloudscraper');

var app = express();
var server = http.createServer(app);

app.use(express.static(__dirname + '/client'));

app.get("/imgCode/:id", function(req, res){
  cloudscraper.get('http://prnt.sc/' + req.params.id, function(error, body, response){
    if (!error){
      res.send(getURLfromHTML(body));
    } else{
      res.send("Error!");
    }
  });
});

function getURLfromHTML(body){
  var parser = cheerio.load(body);
  var link = parser("#screenshot-image").attr("src");
  return link;
}


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});