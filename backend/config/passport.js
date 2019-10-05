const User = require('../models/User');
const passport = require('passport')

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport;

//const SpotifyStrategy = require('passport-spotify').Strategy;
/*
passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/api/auth/login/callback'
    },
    async (accessToken, refreshToken, expires_in, profile, done)=> {
        const spotifyUser = await User.findOne({spotifyId: profile.id})
        console.log(spotifyUser)
        if(!spotifyUser){
            const user = await User.create({spotifyId: profile.id, accessToken})
            done(user)
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
  */
