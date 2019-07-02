const express = require('express');
const path = require('path');
const { getPageInfo } = require('./getPageInfo');
const PORT = 9090;

const app = express();

app.use(express.static(__dirname + '/client'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname) + '/client/index.html');
});

app.post('/', (req, res) => {
  const { url } = req.body;
  getPageInfo(url)
    .then(pageInfo => {
      res.status(200).send(pageInfo);
    })
    .catch(err => res.status(400).send(err));
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
