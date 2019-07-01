const express = require('express');
const path = require('path');
const PORT = 9090;

const app = express();

app.use(express.static(__dirname + '/client'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname) + '/client/index.html');
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
