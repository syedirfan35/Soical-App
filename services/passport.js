const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("config");

//model
const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.get("CLIENT_ID"),
      clientSecret: config.get("CLIENT_SECRET"),
      callbackURL: "/api/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ googleID: profile.id });
      if (user) {
        done(null, user);
      } else {
        const user = new User({
          googleID: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avatarURL: profile.photos[0].value
        });
        await user.save();
        done(null, user);
      }
    }
  )
);
