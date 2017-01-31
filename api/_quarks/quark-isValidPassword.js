module.exports = (password, user) => {
  const pw = require('./toEncryp')(password);
  return (pw == user.auth.local.password);
};
