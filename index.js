const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.Promise = global.Promise;

mongoose.connect(encodeURI(keys.mongoURI),{
  useNewUrlParser:true
},(err, client) => {
  if (err) { console.log(err); }
  console.log('Connected to Mongo');
});

const app = express();

// enabling cookies in the app
// max age( validity ) . 30 days in milliseconds
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
// tell passport to use cookie sessions, cookie session will parse cookie and attach result to req.session
// passport accesses req.session
app.use(passport.session());

require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
