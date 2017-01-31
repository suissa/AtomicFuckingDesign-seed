const LocalStrategy = require('passport-local').Strategy

module.exports = (Model) => {
  const Strategy = new LocalStrategy({
    //by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true //allows us to pass back the entire request to the callback
  }, (req, email, password, done) => {
    if(email)
      email = email.toLowerCase(); //Use lower-case emails to avoid case-sensitives email matching

    //asynchornous
    process.nextTick(function() {
      if(!req.user) {
        // se o usuário não está logado ainda.
        Model.findOne({ 'local.email': email}, function(err, user) {

          // se tiver erros, retornar os erros.
          if(err)
              return done(err);

          // verifica se já tem um usuário com esse email.
          if(user) {
              return done(null,false,req.flash('signupMessage', 'That email is already taken.'));
          } else {

            // create th user
            var newModel = new Model();

            //set the user's local credentials
            newModel.auth.local.email = email;
            newModel.auth.local.password = newModel.generateHash(password);
            console.log('newModel.auth.local.password', newModel.auth.local.password)
            //save the user
            newModel.save(function(err){
                if(err){
                    throw err;
                }
                return done(null, newModel);
            });
          }
        });
      } else if (!req.user.local.email) {
         // ...presumably they're trying to connect a local account
         // BUT let's check if the email used to connect a local account is being used by another user
         Model.findOne({'local.email': email}, function(err, user){
           if(err)
            return done(err);

           if(user){
             return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
             // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
           } else {
             var user = req.user;
             user.auth.local.email = email;
             user.auth.local.password = user.generateHash(password);
              console.log('user.auth.local.password', user.auth.local.password)
             user.save(function(err){
               if(err)
                return done(err);

                return done(null, user);
             });
           }
         });
      } else {
        // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
        return done(null, req.user);
      }
    });
  })
  return Strategy
}
