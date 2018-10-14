
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// single arg to model indicates we are loading the model
const User = mongoose.model('users');

// when done in google strategy is called . the user passed here will be just what we retrieved from DB
passport.serializeUser((user, done) => {
  // args 1: error, 2: what user info to set in cookie ( here mongo record id, not googleId )
  // oAuth's only purpose is to allow login. after that we use internal id's. because multiple oAuth integrations
  // will have different profile id's
  done(null, user.id);
});

/* 
incoming request ->
cookie-session extracts cookie from request -> 
passport pulls user id out of cookie data -> 
deserializeUser function to find user using the user id ->
user model instance is attached to req object as req.user
*/
// args 1: the id we earlier stuffed into cookie is retrieved . 2: done callback to mark success
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// proxy true to allow proxy servers by heroku
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      
      if (existingUser) {
        // we already have a record with the given profile ID
        // args 1: error -> null here, 2: pass the user that was just found
        return done(null, existingUser);
      }

      // we don't have a user record with this ID, make a new record!
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
