const passport = require('passport');
const router = require('express').Router();
const {Profile, VerifyCallback} = require('passport-spotify');
const SpotifyStrategy = require('passport-spotify').Strategy;


let globalToken;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new SpotifyStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function (accessToken, refreshToken, expires_in, profile, done) {
    console.log(accessToken);
    globalToken = accessToken;
    process.nextTick(function () {
      return done(null, profile);
    });
  })
);

router.post('/login', passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private', 'user-top-read', 'user-read-recently-played'], showDialog: true}), (req, res) => {
  res.status(200).send(req.profile);
});

router.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.render('home', {data: globalToken});
  }
);

module.exports = {passport, router};