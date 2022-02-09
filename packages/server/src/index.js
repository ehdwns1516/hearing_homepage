const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

const db = require('./db');
const addressRouter = require('./routes/address');
const adminRouter = require('./routes/admin');
const detailPageRouter = require('./routes/detailPage');
const imageUpload = require('./routes/imageUpload');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use('/api/address', addressRouter);
app.use('/api/admin', adminRouter);
app.use('/api/detail', detailPageRouter);
app.use('/api/upload', imageUpload);

db.once('open', function () {
  console.log('DB Connected');
});

db.on('error', function (err) {
  console.log('DB ERROR : ', err);
});

app.listen(port, function () {
  console.log('server on! ' + port);
});
