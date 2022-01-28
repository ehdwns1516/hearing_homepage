const express = require('express');
const cors = require('cors');
const db = require('./db');
const addressRouter = require('./routes/address');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/address', addressRouter);

db.once('open', function () {
  console.log('DB Connected');
});

db.on('error', function (err) {
  console.log('DB ERROR : ', err);
});

app.get('/', (req, res, next) => {
  res.send('hello world!');
});

app.listen(port, function () {
  console.log('server on! ' + port);
});
