const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.Promise = global.Promise;

mongoose.connect(encodeURI(keys.mongoURI),{
  useNewUrlParser:true
},(err, client) => {
  if (err) {
    console.log(err);
  }
  console.log('Connected to Mongo');
});

const app = express();

require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
