const GithubStrategy = require('passport-github').Strategy;
const configAuth = require('../_hadrons/passwordAuthPassport');
const githubStrategy = {
//pull in our app id and secret from our auth.js file
  clientID        : configAuth.githubAuth.clientID,
  clientSecret    : configAuth.githubAuth.clientSecret,
  callbackURL     : configAuth.githubAuth.callbackURL,
  profileFields   : ['id', 'name', 'email'],
  passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
};


module.exports = (Model) => {
  const Strategy = new GithubStrategy(githubStrategy,
  function(req, token, refreshToken, profile, done){
    //asynchronous
    process.nextTick(function() {
      //check if the user is already logged in
      if(!req.user) {
        //find the user in the database based on their facebook  id
        User.findOne({'github.id': profile.id}, function(err, user) {
        //if there is an error, stop everything and return tha
        // ie an error connecting to the database
        if(err)
          return done(err);

        //if the user is found, then log them in
        if(user) {

          // if there is a user id already but no token (user was linked at one point and then removed)
          if(!user.github.token) {
            user.github.token = token;
            user.github.name = profile.name.givenName + ' ' + profile.name.familyName;
            user.github.email = (profile.emails[0].value || '').toLowerCase();

            user.save(function(err){
              if(err)
                return done(err);

                return done(null, user);
            });
          }

          return done(null, user); //user found, return that user

        } else {
          //if there is no user found with that facebook id, create them
          var newUser = new User();

          //set all of the facebook information in our user model
          newUser.github.id    = profile.id; //set the users facebook id
          newUser.github.token = token; //we will save the token that facebook provides to the user
          newUser.github.name  = profile.name;
          if (profile.email) {
            newUser.github.email = profile.email;
          }
          if (profile.avatar_url) {
            newUser.github.avatar = profile.avatar_url;
          }

          //save our user to the database
          newUser.save(function(err){
            if(err)
              return done(err);

            //if successful, return the new user
            return done(null, newUser);
          });
        }
      });

      } else {
          //user already exists and is logged in, we have to link accounts
          var user = req.user; //pull the user out of the session

          //update the current users facebook credentials
          user.github.id    = profile.id;
          user.github.token = token;
          user.github.name  = profile.name.givenName + ' ' + profile.name.familyName;
          user.github.email = profile.emails[0].value;

          user.save(function(err){
            if(err) return done(err);

            return done(null, user);
          });
      }});
  })
  return Strategy
}
