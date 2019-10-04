const User = require('../models/User');
const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy;

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/api/auth/login/callback'
    },
    access = async(accessToken, refreshToken, expires_in, profile, done)=> {
        const spotifyUser = await User.findOne({spotifyId: profile.id})
        //console.log(spotifyUser)
        if(!spotifyUser){
            User.create({spotifyId: profile.id, accessToken})
        } else {
            return done(spotifyUser);
        }
    }
  )
);
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

module.exports = passport;