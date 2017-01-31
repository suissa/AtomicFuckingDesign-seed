module.exports = (Model) => (id, done) => Model.findByIdDeserializeUser(id, (err, user, res) => done(err, user));
