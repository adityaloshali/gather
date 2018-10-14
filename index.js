const express = require('express');
const keys = require('./config/keys');

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    accessToken => {
      console.log(accessToken);
    }
  )
);

app.get('/', (req, res) => {
  res.send({ hi: 'test' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);