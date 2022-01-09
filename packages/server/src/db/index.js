const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/Oticon')
  .then(() => {
    console.log('MongoDB Connection Success');
  })
  .catch(() => {
    console.log('MongoDB Connection Fail');
  });
const db = mongoose.connection;
module.exports = db;
