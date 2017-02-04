// load up the user model
const Model = require('../modules/users/organism');
// console.log('Model', Model)
//load the auth variables
const configAuth = require('../_hadrons/passwordAuthPassport');

// expose this function to our app using module.exports
module.exports = function(passport){

  //used to serialize the user for the session
  const serializeUser = require('../_quarks/quark-passportSerializeUser')();
  passport.serializeUser(serializeUser);

  //used to deserialize the user
  const deserializeUser = require('../_quarks/quark-passportDeserializeUser')(Model);
  passport.deserializeUser(deserializeUser);

  const localSignup = require('../_organelles/organelle-passport-local-signup')(Model)
  passport.use('local-signup', localSignup)

  // LOCAL
  const localLogin = require('../_organelles/organelle-passport-local-login')(Model)
  passport.use('local-login', localLogin);

  // FACEBOOK
  const facebookLogin = require('../_organelles/organelle-passport-facebook')(Model)
  passport.use(facebookLogin);

  // GITHUB
  const githubLogin = require('../_organelles/organelle-passport-github')(Model)
  passport.use(githubLogin);

};
