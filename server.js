const express = require('express');
const cheerio = require('cheerio');
const cloudscraper = require('cloudscraper');

const app = express();

app.use(express.static(__dirname + '/client'));

app.get('/img/:id', (req, res) => {
  const { id } = req.params;

  cloudscraper.get(`https://prnt.sc/${id}`, (err, resp, body) => {
    if (err) {
      return res.status(500).send('oopsie');
    } else {
      const url = getURLfromHTML(body);
      res.send(url);
    }
  });
});

function getURLfromHTML(body) {
  const parser = cheerio.load(body);
  return parser("#screenshot-image").attr("src");
}

const PORT = 3000;
app.listen(process.env.PORT || PORT, () => {
  console.log("Server listening on port " + PORT);
});
